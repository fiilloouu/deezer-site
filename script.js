// 1. REMPLACE les chiffres ci-dessous par l'ID de ta nouvelle playlist PUBLIQUE
const playlistID = '15238351883'; 

// On interroge l'API pour récupérer le contenu de cette playlist précise
const url = `https://api.deezer.com/playlist/${playlistID}?output=jsonp`;

function loadFavorites() {
    // On crée un élément script pour charger les données sans erreur de sécurité
    const script = document.createElement('script');
    script.src = `${url}&callback=handleResponse`;
    document.body.appendChild(script);
}

function handleResponse(data) {
    const container = document.getElementById('playlist-container');
    container.innerHTML = ''; 

    // Si l'ID est incorrect ou la playlist privée, on affiche un message clair
    if (!data.tracks || !data.tracks.data) {
        container.innerHTML = `
            <p>Erreur : Playlist introuvable.</p>
            <p>Vérifie que :<br>
            1. Tu as bien mis l'ID de la PLAYLIST (pas du profil).<br>
            2. La playlist est réglée sur "PUBLIQUE" dans Deezer.</p>
        `;
        return;
    }

    // On parcourt chaque morceau de la liste pour l'afficher proprement
    data.tracks.data.forEach(track => {
        const trackElement = document.createElement('div');
        trackElement.className = 'track';
        
        // On utilise l'iframe officielle pour avoir le lecteur complet
        trackElement.innerHTML = `
            <img src="${track.album.cover_medium}" alt="Couverture album">
            <h3>${track.title}</h3>
            <p>Artiste : ${track.artist.name}</p>
            <iframe title="Lecteur Deezer" src="https://widget.deezer.com/widget/light/track/${track.id}" width="100%" height="90" frameborder="0" allowtransparency="true" allow="encrypted-media; clipboard-write"></iframe>
        `;
        
        container.appendChild(trackElement);
    });
}

// On lance le chargement dès que la page est prête
loadFavorites();
