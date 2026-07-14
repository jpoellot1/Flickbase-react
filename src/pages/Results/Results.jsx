import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import "./Results.css"
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Results = () => {

const [searchParams] = useSearchParams()
const [movies, setMovies] = useState([])
const [loading, setLoading] = useState(true)
const [searchValue, setSearchValue] = useState('')
const navigate = useNavigate()
const [sortOrder, setSortOrder] = useState('')

const searchQuery = searchParams.get('search')

function handleSearch(event) {
    event.preventDefault()
    if(!searchValue.trim()) return;
    navigate(`/results?search=${searchValue}`)
} 

useEffect(()=> {
    async function fetchMovies () {
        if(!searchQuery) return;
        setSortOrder('')
        setLoading(true)
        try {
            const {data} = await axios.get(`https://www.omdbapi.com/?apikey=c3dc2346&s=${searchQuery}`)
        setMovies(data.Search)
        }
        catch(error) {
            console.error("Error Fetching Movies", error)
        } finally {
        setLoading(false)}
    }
    fetchMovies()
}, [searchQuery])


function handleSort(event) {
    setSortOrder(event.target.value)
}
    const visibleMovies = movies.slice(0,6)

    const sortedVisibleMovies = [...visibleMovies].sort((a,b) => {
        if (sortOrder === 'A_to_Z') {
            return a.Title.localeCompare(b.Title)}
        else if (sortOrder === 'Z_to_A') {
            return b.Title.localeCompare(a.Title)
        }
        return 0;
    })

    function routeToMovie(id) {
    if (!id) {
      console.error("Error: imdbID is undefined!");
      return;
    }
    navigate(`/movie?i=${id}`)
    }

  return (
    <div className="search">
      <div className="search__container">
        <div className="search__title">
          <h1>Search for all your favorite movies in one place!</h1>
        </div>
        <form id="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            id="search-input"
            className="search__bar"
            placeholder="Search by title"
            onChange={(event) => setSearchValue(event.target.value)}
          />
          <button type="submit" className="search__submit">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </form>
      </div>
      <div className="results__container">
        <div className="results__header">
          <div className="results__para">Search Results:</div>
          <select id="sort-select" value={sortOrder} onChange={handleSort}>
            <option value="">Sort</option>
            <option value="A_to_Z">Title, A to Z</option>
            <option value="Z_to_A">Title, Z to A</option>
          </select>
        </div>
        <div className="movies">
          {
          loading ? (
            new Array(6).fill(0).map((element, index) => (
              <div className="movie" key={index}>
                <img className="movie__poster--skeleton" alt=""/>
                <div className="movie__title--skeleton"></div>
                <div className="movie__year--skeleton"></div>
              </div>
            ))
          ) : 
          sortedVisibleMovies.length > 0 ? (
            sortedVisibleMovies
              .map((movie) => (
                <div className="movie" key={movie.imdbID} >
                  <img className="movie__poster" src={movie.Poster} alt=""onClick={() =>routeToMovie(movie.imdbID)}/>
                  <h3 className="movie__title">{movie.Title}</h3>
                  <p className="movie__year">{movie.Year}</p>
                </div>
              ))
              
          ) : (
            <p>No Movies Found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Results