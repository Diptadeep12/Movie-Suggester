const moodMovies = {
    happy: [
        "La La Land",
        "The Grand Budapest Hotel",
        "Mamma Mia!",
        "Singin' in the Rain",
        "The Princess Bride",
        "Up",
        "Ferris Bueller's Day Off"
    ],
    sad: [
        "The Fault in Our Stars",
        "Schindler's List",
        "Atonement",
        "The Pursuit of Happyness",
        "Life is Beautiful",
        "Grave of the Fireflies",
        "Manchester by the Sea"
    ],
    excited: [
        "Mad Max: Fury Road",
        "Guardians of the Galaxy",
        "Inception",
        "The Avengers",
        "Jurassic Park",
        "The Dark Knight Rises",
        "The Matrix"
    ],
    calm: [
        "The Secret Life of Walter Mitty",
        "Spirited Away",
        "The Lion King",
        "The Grandmaster",
        "Amélie",
        "Into the Wild",
        "A Beautiful Mind"
    ]
};


function suggestMovie() {
    const moodSelector = document.getElementById("mood-selector");
    const selectedMood = moodSelector.value;

    const moviesForMood = moodMovies[selectedMood];

    if (moviesForMood && moviesForMood.length > 0) {
        const randomIndex = Math.floor(Math.random() * moviesForMood.length);
        const randomMovieTitle = moviesForMood[randomIndex];

        // Fetch additional details from the TMDb API
        const tmdbApiKey = '4f8b3067f4ffe92e14a7a112876c28e4';
        const tmdbBaseUrl = 'https://api.themoviedb.org/3';
        const tmdbSearchEndpoint = '/search/movie';

        fetch(`${tmdbBaseUrl}${tmdbSearchEndpoint}?api_key=${tmdbApiKey}&query=${encodeURIComponent(randomMovieTitle)}`)
            .then(response => response.json())
            .then(data => {
                if (data.results && data.results.length > 0) {
                    const movie = data.results[0];
                    const overview = movie.overview;
                    const imageUrl = movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                        : 'https://via.placeholder.com/500x750?text=No+Poster';

                    const movieDisplay = document.getElementById("movie-display");
                    movieDisplay.innerHTML = `
                        <h2>${randomMovieTitle}</h2>
                        <img src="${imageUrl}" alt="${randomMovieTitle} Poster" style="max-width: 100%; height: auto;">
                        <p>${overview}</p>
                    `;
                } else {
                    document.getElementById("movie-display").textContent = "No details found for this movie.";
                }
            })
            .catch(error => {
                console.error('Error fetching movie details:', error);
                document.getElementById("movie-display").textContent = "Failed to fetch movie details.";
            });
    } else {
        document.getElementById("movie-display").textContent = "No suggestions for this mood.";
    }
}
