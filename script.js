// Fonction pour choisir un profil
function selectProfile(playlistID) {
    // 1. Cacher l'écran de sélection et afficher le site
    document.getElementById('profile-picker').style.display = 'none';
    document.getElementById('main-site').style.display = 'block';

    // 2. Charger la musique correspondante
    loadMusic(playlistID);
}

// Fonction pour revenir à la sélection
function goBack() {
    document.getElementById('profile-picker').style.display = 'flex';
    document.getElementById('main-site').style.display = 'none';
    document.getElementById('playlist-container').innerHTML = '';
}

function loadMusic(id) {
    const url = `https://api.deezer.com/playlist/${id}?output=jsonp&callback=handleResponse`;
    
    // Supprimer l'ancien script s'il existe
    const oldScript = document.getElementById('deezer-script');
    if (oldScript) oldScript.remove();

    const script = document.createElement('script');
    script.id = 'deezer-script';
    script.src = url;
    document.body.appendChild(script);
}

function handleResponse(data) {
    const container = document.getElementById('playlist-container');
    container.innerHTML = ''; 

    if (!data.tracks) {
        container.innerHTML = '<p>Erreur lors du chargement.</p>';
        return;
    }

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
