const API_URL =
  'https://api.themoviedb.org/3/discover/movie?api_key=56ce55fdc560a0360e08d759c8809561&sort_by=popularity.desc&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w500'
const SEARCH_URL =
  'https://api.themoviedb.org/3/search/movie?api_key=56ce55fdc560a0360e08d759c8809561&query="'
const search = document.getElementById('search')
const main = document.getElementById('main')
const form = document.getElementById('form')

async function getMovies(url) {
  const res = await fetch(url)
  const data = await res.json()
  showMovies(data.results)
}
getMovies(API_URL)
form.addEventListener('submit', (e) => {
  e.preventDefault()
  const searchTerm = search.value
  if (searchTerm && searchTerm !== '') {
    getMovies(SEARCH_URL + searchTerm)
    search.value = ''
  } else {
    window.location.reload()
  }
})
function showMovies(movies) {
  main.innerHTML = ''
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie
    const movieEl = document.createElement('div')
    movieEl.classList.add('movie')
    main.appendChild(movieEl)
    movieEl.innerHTML = `
    <img src="${IMG_PATH + poster_path}" alt="" />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class=${getClassByVote(vote_average)}>${vote_average}</span>
        </div>
        <div class="overview">
          <h3>overview</h3>
         ${overview}
        </div>
    `
  })
}
function getClassByVote(vote) {
  if (vote >= 8) {
    return 'green'
  } else if (vote >= 5) {
    return 'orange'
  } else return 'red'
}
