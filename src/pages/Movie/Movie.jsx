import React, { useEffect, useState } from 'react'
import './Movie.css'
import {useSearchParams, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSpinner } from '@fortawesome/free-solid-svg-icons';


const Movie = () => {

    const [searchParams] = useSearchParams()
    const [movieDetails, setMovieDetails] = useState(null)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    const imdbID = searchParams.get('i')

    

    useEffect(() => {
        async function fetchMovieData() {
            if(!imdbID) return;
            setLoading(true)
            try{
            const {data} = await axios.get(`https://www.omdbapi.com/?apikey=c3dc2346&i=${imdbID}`)
            setMovieDetails(data)
            }
            catch(error) {
                console.error("Error fetching movie details", error)
            }
            finally{
                setLoading(false)
            }
        }
        fetchMovieData()
    }, [imdbID])

    if(loading) return(
        <div className="loading__state">
            <i className='faSpinner'><FontAwesomeIcon icon={faSpinner} /></i>
        </div>
    )

  return (
    <div className="movie__page">
        <button className='back__btn' onClick={() => navigate(-1)}><FontAwesomeIcon icon={faArrowLeft} /> Back</button>
      <div className="movie__container">
        <div className="movie__poster--container">
          <img
            className="movie__page--poster"
            src={movieDetails?.Poster}
            alt={movieDetails?.Title}
          />
        </div>
        <div className="movie__info">
          <h2 className="movie__info--title">{movieDetails?.Title}</h2>
          <p className="movie__info--rating">
            <b>Rated:</b> {movieDetails?.Rated}
          </p>
          <p className="movie__info--release">
            <b>Release Date:</b> {movieDetails?.Released}
          </p>
          <p className="movie__info--imdb">
            <b>IMDB Rating:</b> {movieDetails?.imdbRating}
          </p>
          <div className="movie__info--summary">
            <h3 className="summary__heading">Summary:</h3>
            <p className="summary__para">
              {movieDetails?.Plot}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Movie