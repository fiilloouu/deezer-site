// ================= CONFIGURATION =================
// Remplace par l'ID de ta playlist "mon site" (les 10 chiffres environ)
const MON_ID_PLAYLIST = '15238351883'; 
// =================================================

function selectProfile(profil) {
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
