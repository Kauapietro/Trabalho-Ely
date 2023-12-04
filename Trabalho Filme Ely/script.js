function addMovie() {
    const title = document.getElementById('title').value;
    const genre = document.getElementById('genre').value;
    const year = document.getElementById('year').value;
    const director = document.getElementById('director').value;
    const rating = document.getElementById('rating').value;

    if (title && genre && year && director && rating) {
        const movie = { title, genre, year, director, rating };
        const movies = JSON.parse(localStorage.getItem('movies')) || [];
        movies.push(movie);
        localStorage.setItem('movies', JSON.stringify(movies));
        resetFields();
        displayMovies();
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

function resetFields() {
    ['title', 'genre', 'year', 'director', 'rating'].forEach(field => {
        document.getElementById(field).value = '';
    });
}

function displayMovies() {
    const movieList = document.getElementById('movieList');
    movieList.innerHTML = '';

    const movies = JSON.parse(localStorage.getItem('movies')) || [];

    movies.forEach(movie => {
        const listItem = document.createElement('li');
        listItem.textContent = `Título: ${movie.title}, Gênero: ${movie.genre}, Ano: ${movie.year}, Diretor: ${movie.director}, Avaliação: ${movie.rating}`;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.onclick = () => deleteMovie(movie);

        listItem.appendChild(deleteButton);
        movieList.appendChild(listItem);
    });
}

function deleteMovie(movie) {
    const movies = JSON.parse(localStorage.getItem('movies')) || [];
    const index = movies.findIndex(m => isEqual(m, movie));

    if (index !== -1) {
        movies.splice(index, 1);
        localStorage.setItem('movies', JSON.stringify(movies));
        displayMovies();
    }
}

function isEqual(movie1, movie2) {
    return ['title', 'genre', 'year', 'director', 'rating'].every(field => movie1[field] === movie2[field]);
}

displayMovies();
