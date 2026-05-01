// ⚠️ NE PARTAGE PAS CE TOKEN
const DEEZER_TOKEN = "MET_TON_TOKEN_ICI";

const url = `https://api.deezer.com/user/me/tracks?access_token=${DEEZER_TOKEN}&output=jsonp`;

function loadJSONP(url) {
    const script = document.createElement("script");
    script.src = url + "&callback=displayTracks";
    document.body.appendChild(script);
}

function displayTracks(data) {
    const container = document.getElementById("music-container");

    if (!data.data) {
        container.innerHTML = "Erreur Deezer";
        return;
    }

    data.data.forEach(track => {
        const card = document.createElement("div");
        card.className = "music-card";

        card.innerHTML = `
            <img src="${track.album.cover_medium}">
            <h3>${track.title}</h3>
            <p>${track.artist.name}</p>
            <audio controls src="${track.preview}"></audio>
        `;

        container.appendChild(card);
    });
}

loadJSONP(url);
