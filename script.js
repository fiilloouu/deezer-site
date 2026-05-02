// ================= CONFIGURATION =================
// Remplace par l'ID de ta playlist "mon site" (vu sur ta capture avec 59 titres)
const MON_ID_PLAYLIST = '15238351883'; 
// =================================================

let currentPlaylist = '';

// Étape 1 : Afficher l'écran de login
function showLogin(profil) {
    currentPlaylist = (profil === 'Moi') ? MON_ID_PLAYLIST : '3155776842';
    document.getElementById('profile-picker').style.display = 'none';
    document.getElementById('login-screen').style.display = 'block';
}

// Étape 2 : Passer à la musique
function goToMusic() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('main-site').style.display = 'block';
    loadMusic(currentPlaylist);
}

// Retour au début
function goBack() {
    document.getElementById('profile-picker').style.display = 'block';
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('main-site').style.display = 'none';
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
