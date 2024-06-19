import { useState } from "react"

export const MovieSearch = () => {

  const urlBase = 'https://api.themoviedb.org/3/search/movie'
  const API_KEY = '2a063eca140980027d632d34163b451a'

  const [movie, setMovie] = useState('')
  const [searchs, setSearchs] = useState([])

  const handleInput = (e) => {
    setMovie(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchMovies()
  }

  const fetchMovies = async () => {
    try {
      const response = await fetch(`${urlBase}?query=${movie}&api_key=${API_KEY}`)
      const data = await response.json()
      setSearchs(data.results)
    } catch (error) {
      console.error("Error: ", error)
    }
  }

  return (
    <div className='container'>
      <h1>Movie Search</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Search..."
          value={movie}
          onChange={handleInput}
        />
        <button type="submit">Search</button>
      </form>

      <div className="movie-list">
        {searchs.map((search) => ( 
          <div key={search.id} className="movie-card">
           <h2>{search.title}</h2>
            <img src={`https://image.tmdb.org/t/p/w500${search.poster_path}`} alt={search.title} />

          </div>
        ))}
      </div>

    </div>
  )
}
