import { movies } from './movies.js';

const movieWrapper = document.getElementById('movieWrapper');
const inputSearch = document.querySelector('.inputSearch');
const selectSort = document.querySelector('.selectSort');
const searchBtn = document.querySelector('.btn');

function renderMovies(movieList) {
    movieWrapper.innerHTML = ''; 

    if (movieList.length === 0) {
        movieWrapper.innerHTML = `<h2 style="grid-column: 1/-1; text-align: center; color: white; margin-top: 50px;">Hech narsa topilmadi...</h2>`;
        return;
    }

    movieList.forEach((movie) => {
        const card = document.createElement('div');
        card.className = 'card';

        const title = movie.Title || "No Title";
        const rating = movie.imdb_rating || "0";
        const year = movie.movie_year || "---";
        const runtime = movie.runtime || "0";
        const category = movie.Categories ? movie.Categories.split('|').join(', ') : "Uncategorized";
        const img = movie.ImageURL || 'img/red man.jpg';

        card.innerHTML = `
            <img src="${img}" alt="${title}" class="img2" onerror="this.src='img/red man.jpg'">
            <h1>${title}</h1>
            <div class="df">
                <p>${rating}</p>
                <p>${year}</p>
                <p>${runtime} min</p>
            </div>
            <h1>${category}</h1>
            <button class="btn1">More info</button>
        `;
        
        movieWrapper.appendChild(card);
    });
}

function handleFilter() {
    const searchTerm = inputSearch.value.toLowerCase().trim();
    const sortValue = selectSort.value;

    let filteredMovies = movies.filter(movie => {
        return movie.Title.toString().toLowerCase().includes(searchTerm);
    });

    if (sortValue === "ABC") {
        filteredMovies.sort((a, b) => a.Title.toString().localeCompare(b.Title.toString()));
    } else if (sortValue === "CBA") {
        filteredMovies.sort((a, b) => b.Title.toString().localeCompare(a.Title.toString()));
    }

    renderMovies(filteredMovies);
}

searchBtn.addEventListener('click', (e) => {
    e.preventDefault(); 
    handleFilter();
});

inputSearch.addEventListener('input', handleFilter);
selectSort.addEventListener('change', handleFilter);

renderMovies(movies);


const swiper = new Swiper(".mySwiper", {
    loop: true, 
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

renderMovies(movies); 