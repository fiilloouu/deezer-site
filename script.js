// ================= CONFIGURATION =================
// Mets ici l'ID de ta playlist "mon site" (les chiffres)
const MON_ID_PLAYLIST = '15238351883'; 
// =================================================

function startApp(mode) {
    document.getElementById('profile-picker').style.display = 'none';
    document.getElementById('main-site').style.display = 'block';
    
    let id = (mode === 'moi') ? MON_ID_PLAYLIST : '3155776842';
    document.getElementById('page-title').innerText = (mode === 'moi') ? "Mes Favoris" : "Top Hits";
    loadData(`https://api.deezer.com/playlist/${id}`);
}

function searchMusic() {
    const query = document.getElementById('search-input').value;
    if (query) {
        document.getElementById('page-title').innerText = "Résultats : " + query;
        loadData(`https://api.deezer.com/search?q=${query}`);
    }
}

function loadData(endpoint) {
    const url = `${endpoint}?output=jsonp&callback=handleResponse`;
    const old = document.getElementById('deezer-api');
    if (old) old.remove();

    const script = document.createElement('script');
    script.id = 'deezer-api';
    script.src = url;
    document.body.appendChild(script);
}

function handleResponse(data) {
    const container = document.getElementById('playlist-container');
    container.innerHTML = '';
    const tracks = data.tracks ? data.tracks.data : data.data;

    if (tracks) {
        tracks.forEach(track => {
            const div = document.createElement('div');
            div.className = 'track';
            div.innerHTML = `
                <h4>${track.title}</h4>
                <p style="color:#888; font-size:14px;">${track.artist.name}</p>
                <iframe src="https://widget.deezer.com/widget/dark/track/${track.id}" width="100%" height="80" frameborder="0" allow="encrypted-media"></iframe>
            `;
            container.appendChild(div);
        });
    }
}

function goBack() {
    document.getElementById('profile-picker').style.display = 'block';
    document.getElementById('main-site').style.display = 'none';
}
