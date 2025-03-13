const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NzQ2YTg3YjY5NzhjMzg5YTM3OGEwZTRlZjEyMzFjNiIsIm5iZiI6MTc0MTU5MTczNS4yOTc5OTk5LCJzdWIiOiI2N2NlOTRiN2Q5NWU0MTFkZDAyYTY2ZDQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.bPIJA629dD1jmALwDCez6tIBK8nyaDmTCrtbXQEiKIw'; 
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const fetchMovies = async (category, containerId) => {
    try {
        const response = await fetch(`${BASE_URL}/movie/${category}?language=en-US&page=1`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_KEY}`
            }
        });
        const data = await response.json();
        displayMovies(data.results, containerId);
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
};

const displayMovies = (movies, containerId) => {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
            <a href="detail.html?id=${movie.id}">
                <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}">
            </a>
            <h3>${movie.title}</h3>
            <p class="stjerne">⭐ ${movie.vote_average} IMDb</p>
        `;
        container.appendChild(movieCard);
    });
};


// Dark mode toggle funktion
const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
};

// HTML structure
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

    <div class = "flex3">
        <h1>Now Showing</h1>
        <div><a href="#">See more</a></div>
    </div>
    
    <div id="now-playing" class="movies-container"></div>
    <h1>Popular Movies</h1>
    <div id="popular" class="movies-container"></div>
    
`;

// Tjek for gemt dark mode-indstilling i localStorage
const darkModeToggle = document.getElementById('darkModeToggle');

if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeToggle.checked = true;
}

// Event listener til switch-knappen
darkModeToggle.addEventListener('change', toggleDarkMode);

// Fetch movies
fetchMovies('now_playing', 'now-playing');
fetchMovies('popular', 'popular');
document.getElementById('movie-length').textContent = `${movie.runtime} min`;


