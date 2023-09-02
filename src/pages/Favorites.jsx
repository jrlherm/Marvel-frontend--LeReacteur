import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function FavoriteComics() {
  const [favoritesCharacters, setFavoritesCharacters] = useState([]);

  useEffect(() => {
    const userToken = Cookies.get("token");
    console.log(userToken);
    axios
      .get(
        `https://site--marvel-backend--vm2w9vyj7r62.code.run/favoritesCharacters?userToken=${userToken}`
      )
      .then((response) => {
        setFavoritesCharacters(response.data.favorites);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des comics favoris :",
          error
        );
      });
  }, []);

  return (
    <div>
      <h2>Mes Comics Favoris</h2>
      <ul>
        {favoritesCharacters.map((comic) => (
          <li key={comic._id}>{comic.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default FavoriteComics;
