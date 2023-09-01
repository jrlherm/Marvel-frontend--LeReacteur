import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Favorites = () => {
  const [userFavorites, setUserFavorites] = useState({
    characters: [],
    comics: [],
  });

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get("/get-favorites");
        setUserFavorites(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className="favorites">
      <h1>Mes Favoris</h1>
      <div className="favorite-characters">
        <h2>Personnages favoris</h2>
        <div className="list">
          {userFavorites.characters.map((character) => (
            <p key={character._id}>{character.name}</p>
          ))}
        </div>
      </div>
      <div className="favorite-comics">
        <h2>Comics favoris</h2>
        <div className="list">
          {userFavorites.comics.map((comic) => (
            <p key={comic._id}>{comic.title}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
