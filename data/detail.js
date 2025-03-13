const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NzQ2YTg3YjY5NzhjMzg5YTM3OGEwZTRlZjEyMzFjNiIsIm5iZiI6MTc0MTU5MTczNS4yOTc5OTk5LCJzdWIiOiI2N2NlOTRiN2Q5NWU0MTFkZDAyYTY2ZDQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.bPIJA629dD1jmALwDCez6tIBK8nyaDmTCrtbXQEiKIw'; 
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';


// Hent filmens ID fra URL
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

// Funktion til at hente filmens detaljer
const fetchMovieDetails = async (movieId) => {
    try {
        const response = await fetch(`${BASE_URL}/movie/${movieId}?language=en-US`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_KEY}`
            }
        });
        const movieDetails = await response.json();
        displayMovieDetails(movieDetails);
    } catch (error) {
        console.error('Error fetching movie details:', error);
    }
};

// Funktion til at vise filmens detaljer
const displayMovieDetails = (movie) => {
    const container = document.getElementById('movie-details');
    container.innerHTML = `
        <h1>${movie.title}</h1>
        <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}">
        <p><strong>⭐ ${movie.vote_average}</strong></p>
        <p><strong>Længde:</strong> ${movie.runtime} min</p>
        <p><strong>Language:</strong> ${movie.original_language}</p>
        <p><strong>Genre:</strong> ${movie.genres.map(genre => genre.name).join(', ')}</p>
        <p><strong>Beskrivelse:</strong> ${movie.overview}</p>
    `;
};

// Dark mode toggle funktion
const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
};

// HTML struktur for detaljesiden
document.body.innerHTML = `
    <div class="flex_header">
        <p>9:41</p>
        <i class="fa-solid fa-signal"></i>  
        <i class="fa-solid fa-wifi"></i>
        <i class="fa-solid fa-battery-full"></i>
    </div>

    <div class="flex_1">
        <i class="fa-solid fa-bars-staggered"></i>
        <h4>MyMovies</h4>
        
        <!-- Toggle Switch -->
        <label class="switch">
            <input type="checkbox" id="darkModeToggle">
            <span class="slider"></span>
        </label>
    </div>

    <div id="movie-details" class="movie-container"></div>
`;

// Tjek for gemt dark mode-indstilling i localStorage
const darkModeToggle = document.getElementById('darkModeToggle');

if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeToggle.checked = true;
}

// Event listener til switch-knappen
darkModeToggle.addEventListener('change', toggleDarkMode);

// Hent og vis filmens detaljer
fetchMovieDetails(movieId);
