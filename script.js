const albumData = [
  { id: 1, title: "My Ghosts Go Ghost", artist: "By Storm", year: 2023, genre: "Hip-Hop / Experimental", cover: "https://picsum.photos/seed/ghosts/300/300", rating: "4.8 / 5" },
  { id: 2, title: "The Mountain", artist: "Gorillaz", year: 2020, genre: "Alternative / Electronic", cover: "https://picsum.photos/seed/mountain/300/300", rating: "4.6 / 5" },
  { id: 3, title: "The Turning Wheel", artist: "SPELLLING", year: 2021, genre: "Art Pop / Chamber Music", cover: "https://picsum.photos/seed/wheel/300/300", rating: "4.9 / 5" },
  { id: 4, title: "SINNER GET READY", artist: "Lingua Ignota", year: 2021, genre: "Neofolk / Avant-Garde", cover: "https://picsum.photos/seed/sinner/300/300", rating: "4.7 / 5" },
  { id: 5, title: "Blue", artist: "Joni Mitchell", year: 1971, genre: "Folk / Singer-Songwriter", cover: "https://picsum.photos/seed/blue/300/300", rating: "5.0 / 5" },
  { id: 6, title: "At Folsom Prison", artist: "Johnny Cash", year: 1968, genre: "Country / Outlaw", cover: "https://picsum.photos/seed/cash/300/300", rating: "4.9 / 5" }
];

const appContent = document.getElementById("app-content");

function renderHome() {
  appContent.innerHTML = `
    <div class="p-5 mb-4 bg-black rounded-3 border border-secondary">
      <div class="container-fluid py-3">
        <h1 class="display-5 fw-bold text-success">Welcome to Vibe</h1>
        <p class="col-md-8 fs-4 text-light">Explore, review, and discover incredible music across genres. Built for listeners who care about high-quality records.</p>
        <button class="btn btn-success btn-lg navbar-link" data-page="albums">Browse Top Albums</button>
      </div>
    </div>

    <h2 class="border-bottom border-secondary pb-2 mb-4 text-success">Featured Highlights</h2>
    <div class="row row-cols-1 row-cols-md-3 g-4">
      ${albumData.slice(0, 3).map(album => createAlbumCard(album)).join("")}
    </div>
  `;
  attachLinkListeners();
}

function renderAlbums(filtered = albumData) {
  appContent.innerHTML = `
    <h2 class="border-bottom border-secondary pb-2 mb-4 text-success">Album Catalog</h2>
    <div class="row row-cols-1 row-cols-md-3 g-4">
      ${filtered.length > 0 ? filtered.map(album => createAlbumCard(album)).join("") : `<p class="fs-5 text-muted">No albums match your search criteria.</p>`}
    </div>
  `;
  attachLinkListeners();
}

function renderArtists() {
  const artists = [...new Set(albumData.map(a => a.artist))];
  appContent.innerHTML = `
    <h2 class="border-bottom border-secondary pb-2 mb-4 text-success">Featured Artists</h2>
    <ul class="list-group list-group-flush bg-dark">
      ${artists.map(artist => `
        <li class="list-group-item bg-dark text-light border-secondary fs-5 d-flex justify-content-between align-items-center">
          🎤 ${artist}
          <span class="badge bg-success rounded-pill">${albumData.filter(a => a.artist === artist).length} Album(s)</span>
        </li>
      `).join("")}
    </ul>
  `;
}

function renderAbout() {
  appContent.innerHTML = `
    <div class="card bg-black border-secondary text-light p-4">
      <h2 class="text-success mb-3">About Vibe</h2>
      <p class="fs-5">Vibe is a single-page music app built using modern standard web technologies (HTML5, Bootstrap 5, and JavaScript DOM manipulation).</p>
      <p class="fs-6 text-secondary">Designed for smooth client-side routing and rapid album discovery.</p>
    </div>
  `;
}

function createAlbumCard(album) {
  return `
    <div class="col">
      <div class="card h-100 bg-black border-secondary text-light shadow">
        <img src="${album.cover}" class="card-img-top" alt="${album.title} cover">
        <div class="card-body">
          <h5 class="card-title text-success">${album.title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${album.artist} (${album.year})</h6>
          <p class="card-text"><small class="text-secondary">Genre:</small> ${album.genre}</p>
        </div>
        <div class="card-footer border-secondary d-flex justify-content-between align-items-center">
          <span class="badge bg-outline-success border border-success text-success">Rating: ${album.rating}</span>
        </div>
      </div>
    </div>
  `;
}

function attachLinkListeners() {
  document.querySelectorAll(".navbar-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = link.getAttribute("data-page");
      navigate(page);
    });
  });
}

function navigate(page) {
  document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
  const activeLink = document.querySelector(`.nav-link[data-page="${page}"]`);
  if (activeLink) activeLink.classList.add("active");

  if (page === "home") renderHome();
  else if (page === "albums") renderAlbums();
  else if (page === "artists") renderArtists();
  else if (page === "about") renderAbout();
}

document.getElementById("search-input").addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = albumData.filter(album => 
    album.title.toLowerCase().includes(query) ||
    album.artist.toLowerCase().includes(query) ||
    album.genre.toLowerCase().includes(query)
  );
  renderAlbums(filtered);
});

document.addEventListener("DOMContentLoaded", () => {
  renderHome();
});