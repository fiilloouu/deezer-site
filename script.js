// REMPLACE le nombre ci-dessous par l'ID de ta playlist "Coups de cœur"
const playlistID = '4443585522'; 

// L'URL cible maintenant ta playlist spécifique
const url = `https://api.deezer.com/playlist/${playlistID}?output=jsonp`;

function loadFavorites() {
    const script = document.createElement('script');
    script.src = `${url}&callback=handleResponse`;
    document.body.appendChild(script);
}

function handleResponse(data) {
    const container = document.getElementById('playlist-container');
    container.innerHTML = ''; 

    // Vérification si la playlist existe ou est publique
    if (!data.tracks) {
        container.innerHTML = '<p>Erreur : Playlist introuvable. Vérifie qu\'elle est bien en "Publique".</p>';
        return;
    }

    // On parcourt les morceaux de TA playlist
    data.tracks.data.forEach(track => {
        const trackElement = document.createElement('div');
        trackElement.className = 'track';
        
        trackElement.innerHTML = `
            <img src="${track.album.cover_medium}" alt="Couverture album">
            <h3>${track.title}</h3>
            <p>Artiste : ${track.artist.name}</p>
            <audio controls src="${track.preview}"></audio>
        `;
        
        container.appendChild(trackElement);
    });
}

// Lancement au chargement
loadFavorites();
