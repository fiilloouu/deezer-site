// On définit l'URL de l'API pour un artiste ou une playlist (ex: Daft Punk)
const url = 'https://api.deezer.com/artist/27/top?limit=10&output=jsonp';

// Fonction pour récupérer les données
function searchMusic() {
    // Utilisation de JSONP pour éviter les blocages de sécurité (CORS) sur navigateur
    const script = document.createElement('script');
    script.src = `${url}&callback=handleResponse`;
    document.body.appendChild(script);
}

// Fonction qui affiche les résultats sur la page
function handleResponse(data) {
    const container = document.getElementById('playlist-container');
    container.innerHTML = ''; // On vide le texte "Chargement..."

    data.data.forEach(track => {
        // On crée un bloc HTML pour chaque chanson
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

// On lance la recherche au chargement de la page
searchMusic();
