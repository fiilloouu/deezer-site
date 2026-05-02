// ================= CONFIGURATION =================
// Mets ici l'ID de ta playlist "mon site" (les chiffres après /playlist/)
const MON_ID_PLAYLIST = '15238351883'; 
// =================================================

function openLogin() {
    let loginWindow = window.open('https://www.deezer.com/login', 'Deezer', 'width=600,height=600');
    document.getElementById('login-status').innerText = "Une fois connecté, ferme cette fenêtre pour valider.";
    
    // On recharge le site dès que tu fermes la fenêtre de login
    let timer = setInterval(function() {
        if (loginWindow.closed) {
            clearInterval(timer);
            window.location.reload();
        }
    }, 1000);
}

function startApp(profil) {
    let idChoisi = (profil === 'moi') ? MON_ID_PLAYLIST : '3155776842';
    let nomAffiche = (profil === 'moi') ? "Ma Musique" : "Top Hits France";

    document.getElementById('profile-picker').style.display = 'none';
    document.getElementById('main-site').style.display = 'block';
    document.getElementById('user-welcome').innerText = nomAffiche;
    
    loadMusic(idChoisi);
}

function loadMusic(id) {
    const url = `https://api.deezer.com/playlist/${id}?output=jsonp&callback=handleResponse`;
    const oldScript = document.getElementById('deezer-api');
    if (oldScript) oldScript.remove();

    const script = document.createElement('script');
    script.id = 'deezer-api';
    script.src = url;
    document.body.appendChild(script);
}

function handleResponse(data) {
    const container = document.getElementById('playlist-container');
    container.innerHTML = ''; 
    
    if (data.tracks) {
        data.tracks.data.forEach(track => {
            const div = document.createElement('div');
            div.className = 'track';
            div.innerHTML = `
                <h3>${track.title}</h3>
                <p>${track.artist.name}</p>
                <iframe src="https://widget.deezer.com/widget/light/track/${track.id}" 
                        width="100%" height="90" frameborder="0" allow="encrypted-media"></iframe>
            `;
            container.appendChild(div);
        });
    }
}

function goBack() {
    document.getElementById('profile-picker').style.display = 'block';
    document.getElementById('main-site').style.display = 'none';
}
