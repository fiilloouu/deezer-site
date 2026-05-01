// Ton Identifiant Utilisateur Deezer
const userID = '4443585522'; 

// L'URL cible maintenant les morceaux favoris (tracks) de ton profil utilisateur (user)
// On ajoute limit=50 pour afficher plus que les 10 premiers titres
const url = `https://api.deezer.com/user/${userID}/tracks?limit=50&output=jsonp`;

function loadFavorites() {
    const script = document.createElement('script');
    script.src = `${url}&callback=handleResponse`;
    document.body.appendChild(script);
}

function handleResponse(data) {
    const container = document.getElementById('playlist-container');
    container.innerHTML = ''; 

    // Vérification en cas d'erreur ou si ton profil est réglé sur "Privé"
    if (data.error || !data.data || data.data.length === 0) {
        container.innerHTML = '<p>Erreur : Impossible de charger tes favoris. Assure-toi que ton profil Deezer est réglé sur "Public" dans tes paramètres.</p>';
        return;
    }

    // On parcourt les morceaux de tes coups de cœur
    data.data.forEach(track => {
        const trackElement = document.createElement('div');
        trackElement.className = 'track';
        
        // On intègre le lecteur complet de Deezer
        trackElement.innerHTML = `
            <img src="${track.album.cover_medium}" alt="Couverture album">
            <h3>${track.title}</h3>
            <p>Artiste : ${track.artist.name}</p>
            <iframe title="Lecteur Deezer" src="https://widget.deezer.com/widget/light/track/${track.id}" width="100%" height="90" frameborder="0" allowtransparency="true" allow="encrypted-media; clipboard-write"></iframe>
        `;
        
        container.appendChild(trackElement);
    });
}

// Lancement au chargement de la page
loadFavorites();
