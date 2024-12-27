import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxODk5YmU1MDFkNDBjYjQyMzM5YzBhZDZhNTU2NGYyOCIsIm5iZiI6MTczNDQzOTI5OC41NDU5OTk4LCJzdWIiOiI2NzYxNzE4MmNkZjFlZDJlNDMxOGE0OTIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.zEUnejRsGwquDfJeJcqztDrLawwKED_L-j-8fc27T1M',
    },
  };

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
          options
        );
        const data = await res.json();
        // Pick the first result with a valid YouTube key
        const video = data.results.find((item) => item.site === 'YouTube') || {};
        setApiData(video);
      } catch (error) {
        console.error('Error fetching video data:', error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchVideoData();
  }, [id]);

  return (
    <div className='player'>
      {/* Back Button */}
      <img
        src={back_arrow_icon}
        alt='Back'
        onClick={() => {
          navigate(-1); // Go back one page
        }}
        style={{ cursor: 'pointer' }}
      />

      {/* Video Section */}
      {loading ? (
        <div className='loading'>Loading...</div>
      ) : apiData.key ? (
        <>
          <iframe
            width='90%'
            height='90%'
            src={`https://www.youtube.com/embed/${apiData.key}`}
            title={apiData.name || 'Trailer'}
            frameBorder='0'
            allow='autoplay; encrypted-media'
            allowFullScreen
          ></iframe>

          {/* Video Info */}
          <div className='player-info'>
            <p>Published: {apiData.published_at?.slice(0, 10) || 'N/A'}</p>
            <p>Title: {apiData.name || 'N/A'}</p>
            <p>Type: {apiData.type || 'N/A'}</p>
          </div>
        </>
      ) : (
        <div className='error'>No video available for this movie.</div>
      )}
    </div>
  );
};

export default Player;
