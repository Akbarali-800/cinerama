// HTML elementlarni olish
const searchBtn = document.querySelector("#button");
const searchInp = document.querySelector("#search-input");
const mainDiv = document.querySelector("#main_div");
const themeToggle = document.getElementById("theme-toggle");

// Kinolarni saqlash
const movies = [
    {
        id: 1,
        title: "Titanic ",
        year: 1997,
        genre: ["Sci-Fi", "Action"],
        director: "James Cameron",
        rating: 8.8,
        poster: "https://m.media-amazon.com/images/M/MV5BYzYyN2FiZmUtYWYzMy00MzViLWJkZTMtOGY1ZjgzNWMwN2YxXkEyXkFqcGc@._V1_.jpg"
    },
    {
        id: 2,
        title: "The Dark Knight",
        year: 2008,
        genre: ["Action", "Crime"],
        director: "Christopher Nolan",
        rating: 9.0,
        poster: "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_FMjpg_UX1000_.jpg"
    },
    
    {
        id: 3,
        title: "Interstellar",
        year: 2014,
        genre: ["Sci-Fi", "Drama"],
        director: "Christopher Nolan",
        rating: 8.6,
        poster: "https://m.media-amazon.com/images/M/MV5BODY2MTAzOTQ4M15BMl5BanBnXkFtZTgwNzg5MTE0MjI@._V1_.jpg"
    }
];


document.getElementById("sort-options").addEventListener("change", (event) => {
    const sortOrder = event.target.value;
    const movieCards = Array.from(document.querySelectorAll(".movie-card2"));
    
    // Sort movie cards based on their title (h3.card2_title)
    movieCards.sort((a, b) => {
        const titleA = a.querySelector(".card2_title").textContent;
        const titleB = b.querySelector(".card2_title").textContent;
        
        if (sortOrder === "A-B") {
            return titleA.localeCompare(titleB); // A-B
        } else if (sortOrder === "B-A") {
            return titleB.localeCompare(titleA); // B-A
        }
        return 0;
    });

    // Re-append the sorted movie cards to the parent container
    const mainDiv = document.getElementById("main_div2");
    movieCards.forEach(card => {
        mainDiv.appendChild(card);
    });
});







// **🎬 Kinolarni chiqarish funksiyasi**
// 🎬 Kinolarni chiqarish funksiyasi
function displayMovies(movieList) {
    mainDiv.innerHTML = ""; // Divni tozalash
    if (movieList.length === 0) {
        mainDiv.innerHTML = "<p>No movies found</p>"; // Agar hech narsa topilmasa
        return;
    }

    movieList.forEach(movie => {
        const movieCard = document.createElement("div");
        movieCard.className = "movie-card";
        movieCard.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}">
            <h2>${movie.title} (${movie.year})</h2>
            <p>Directed by ${movie.director}</p>
            <p>Genre: ${movie.genre.join(", ")}</p>
            <p>Rating: ${movie.rating}</p>
            <a href="film1.html?id=${movie.id}" class="view-details">See movie</a>
        `;

        mainDiv.appendChild(movieCard);
    });
}

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    // const inputQiymati = searchInp.value.toLowerCase();
    const inputQiymati = searchInp.value.trim().toLowerCase();

    const filterLanganlar = movies.filter(item => {
        return item.title.toLowerCase().includes(inputQiymati);
    });

    displayMovies(filterLanganlar);
});


searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const inputQiymati = searchInp.value.trim().toLowerCase();

    // HTML sahifasidagi barcha movie-card2 elementlarini olish
    const allMovies = document.querySelectorAll(".movie-card2");

    allMovies.forEach(movie => {
        const titleElement = movie.querySelector(".card2_title");
        const movieTitle = titleElement.innerText.trim().toLowerCase();

        // Qidiruv so‘rovi film nomida bo‘lsa, ko‘rsatamiz, aks holda yashiramiz
        if (movieTitle.includes(inputQiymati)) {
            movie.style.display = "block";
        } else {
            movie.style.display = "none";
        }
    });
});


// Sort dropdownni olish





function redirectToMovie(movieId) {
    localStorage.setItem("selectedMovie", movieId);
    window.location.href = "film1.html";
}

function loadMovies() {
    displayMovies(movies);
}

function saveTheme(theme) {
    localStorage.setItem("theme", theme);
}

function loadTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    loadTheme();
    loadMovies();
});

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        const currentTheme = document.body.classList.contains("dark-mode") ? "dark" : "light";
        saveTheme(currentTheme);
    });
}


