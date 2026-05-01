// Ton Identifiant Utilisateur personnel
const userID = '4443585522/loved'; 

// L'URL cible tes morceaux favoris (tracks)
const url = `https://api.deezer.com/user/${userID}/tracks?limit=50&output=jsonp`;

function loadFavorites() {
    const script = document.createElement('script');
    script.src = `${url}&callback=handleResponse`;
    document.body.appendChild(script);
}

function handleResponse(data) {
    const container = document.getElementById('playlist-container');
    container.innerHTML = ''; 

    // Si le profil est toujours privé ou introuvable, on affiche une erreur
    if (data.error || !data.data || data.data.length === 0) {
        container.innerHTML = '<p>Erreur : Impossible de charger tes favoris. Assure-toi que ton profil Deezer est bien réglé sur "Public".</p>';
        return;
    }

    // On parcourt tes coups de cœur
    data.data.forEach(track => {
        const trackElement = document.createElement('div');
        trackElement.className = 'track';
        
        // Le lecteur complet de Deezer
        trackElement.innerHTML = `
            <img src="${track.album.cover_medium}" alt="Couverture album">
            <h3>${track.title}</h3>
            <p>Artiste : ${track.artist.name}</p>
            <iframe title="Lecteur Deezer" src="https://widget.deezer.com/widget/light/track/${track.id}" width="100%" height="90" frameborder="0" allowtransparency="true" allow="encrypted-media; clipboard-write"></iframe>
        `;
        
        container.appendChild(trackElement);
    });
}

// On lance la fonction au chargement de la page
loadFavorites();
