import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import "./Home.css"
import Flickbase from '../../Assets/Flickbase.jpg'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate()
  


    function handleSearch(event) {
      event.preventDefault()
      if(!searchValue.trim()) return;
      navigate(`/results?search=${searchValue}`)
     } 


  return (
    <div className="home">
      <div className="search__container">
        <div className="search__title">
          <h1>Search for all your favorite movies in one place!</h1>
        </div>
        <form id="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            className="search__bar"
            placeholder="Search by title"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />
          <button type="submit" className="search__submit">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </form>
      </div>
      <div className="picture">
        <img src={Flickbase} alt="" />
      </div>
    </div>
  );
}

export default Home