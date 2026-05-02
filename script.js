// ================= CONFIGURATION =================
const MON_ID_PLAYLIST = '15238351883'; 
// =================================================

function startApp(profil) {
    document.getElementById('profile-picker').style.display = 'none';
    document.getElementById('main-site').style.display = 'block';
    loadData(`https://api.deezer.com/playlist/${MON_ID_PLAYLIST}`);
}

// Fonction de recherche
function searchMusic() {
    const query = document.getElementById('search-input').value;
    if (query !== "") {
        document.getElementById('user-welcome').innerText = "Résultats pour : " + query;
        loadData(`https://api.deezer.com/search?q=${query}`);
    }
}

function loadData(baseUrl) {
    const url = `${baseUrl}?output=jsonp&callback=handleResponse`;
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
    
    // L'API répond différemment pour une playlist ou une recherche
    const tracks = data.tracks ? data.tracks.data : data.data;

    if (tracks) {
        tracks.forEach(track => {
            const div = document.createElement('div');
            div.className = 'track';
            div.innerHTML = `
                <h4>${track.title}</h4>
                <iframe src="https://widget.deezer.com/widget/dark/track/${track.id}" 
                        width="100%" height="80" frameborder="0" allow="encrypted-media"></iframe>
            `;
            container.appendChild(div);
        });
    }
}

function goBack() {
    document.getElementById('profile-picker').style.display = 'block';
    document.getElementById('main-site').style.display = 'none';
}
