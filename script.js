// 1. Ton ID de playlist (récupéré avec le bouton partager)
const playlistID = 'TON_ID_DE_PLAYLIST_ICI'; 

const url = `https://api.deezer.com/playlist/${playlistID}?output=jsonp`;

// Fonction pour ouvrir la connexion Deezer dans une petite fenêtre
function openLogin() {
    const width = 600;
    const height = 600;
    const left = (window.innerWidth / 2) - (width / 2);
    const top = (window.innerHeight / 2) - (height / 2);
    
    // Ouvre la page de login officielle dans un petit "pop-up"
    window.open(
        'https://www.deezer.com/login', 
        'DeezerLogin', 
        `width=${width},height=${height},top=${top},left=${left}`
    );
}

function loadFavorites() {
    const script = document.createElement('script');
    script.src = `${url}&callback=handleResponse`;
    document.body.appendChild(script);
}

function handleResponse(data) {
    const container = document.getElementById('playlist-container');
    container.innerHTML = ''; 

    if (!data.tracks) {
        container.innerHTML = '<p>Erreur : Playlist introuvable.</p>';
        return;
    }

    data.tracks.data.forEach(track => {
        const trackElement = document.createElement('div');
        trackElement.className = 'track';
        
        trackElement.innerHTML = `
            <img src="${track.album.cover_medium}" alt="Couverture album">
            <h3>${track.title}</h3>
            <p>Artiste : ${track.artist.name}</p>
            <iframe title="Lecteur Deezer" 
                    src="https://widget.deezer.com/widget/light/track/${track.id}" 
                    width="100%" height="90" frameborder="0" 
                    allowtransparency="true" 
                    allow="encrypted-media; clipboard-write">
            </iframe>
        `;
        
        container.appendChild(trackElement);
    });
}

// Lancement au chargement
loadFavorites();
