import {TMDB_API_KEY} from "@env"

export function getFilmsFromApiWithSearchedText (text, page) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + TMDB_API_KEY + '&language=fr&query=' + text + "&page=" + page
    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))    
}

export function getImageFromApi (name) {
    return 'https://image.tmdb.org/t/p/w300' + name
  }