import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import { Link } from 'react-router-dom';

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxODk5YmU1MDFkNDBjYjQyMzM5YzBhZDZhNTU2NGYyOCIsIm5iZiI6MTczNDQzOTI5OC41NDU5OTk4LCJzdWIiOiI2NzYxNzE4MmNkZjFlZDJlNDMxOGE0OTIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.zEUnejRsGwquDfJeJcqztDrLawwKED_L-j-8fc27T1M',
    },
  };

  const handleWheel = (event) => {
    event.preventDefault();
    if (cardsRef.current) {
      cardsRef.current.scrollLeft += event.deltaY;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${category ? category : 'now_playing'}?language=en-US&page=1`,
          options
        );
        const data = await response.json();
        setApiData(data.results || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    if (cardsRef.current) {
      cardsRef.current.addEventListener('wheel', handleWheel);
    }

    // Cleanup event listener
    return () => {
      if (cardsRef.current) {
        cardsRef.current.removeEventListener('wheel', handleWheel);
      }
    };
  }, [category]); // Added `category` as dependency

  return (
    <div className='titlecards'>
      <h2>{title ? title : 'Popular on Netflix'}</h2>
      <div className='card-list' ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} className='card' key={card.id || index}>
              <img
                src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
                alt={card.original_title || 'Movie'}
              />
              <p>{card.original_title || 'Untitled'}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;
