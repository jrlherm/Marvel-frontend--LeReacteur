import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const FavoriteComics = () => {
  const [favoritesCharacters, setFavoritesCharacters] = useState([]);
  const userToken = Cookies.get("token");

  useEffect(() => {
    fetchData();
  }, [userToken]);

  const fetchData = async () => {
    try {
      const fetchFavouriteCharactersId = await axios.get(
        `https://site--marvel-backend--vm2w9vyj7r62.code.run/favoritesCharacters?userToken=${userToken}`
      );
      const characterIds = fetchFavouriteCharactersId.data.favorites;

      const characterPromises = characterIds.map(async (id) => {
        const response = await axios.get(
          `https://site--marvel-backend--vm2w9vyj7r62.code.run/characters/${id}`
        );
        return response.data;
      });

      const charactersData = await Promise.all(characterPromises);
      setFavoritesCharacters(charactersData);
    } catch (error) {
      console.error("Erreur lors de la récupération des favoris :", error);
    }
  };

  const removeFavoriteCharacter = async (favoriteCharacterId) => {
    try {
      const response = await axios.delete(
        `https://site--marvel-backend--vm2w9vyj7r62.code.run/characters/favorites?userToken=${userToken}&favoriteCharacterId=${favoriteCharacterId}`
      );
      console.log(response.data.message);
      fetchData();
    } catch (error) {
      console.error("Erreur lors de la suppression du favori :", error);
    }
  };

  return (
    <div className="favorites">
      <div className="container">
        <h1>Mes personnages Favoris</h1>
        {favoritesCharacters.map((character, index) => (
          <div key={index} className="favorite">
            <img
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt={`${character.name} thumbnail`}
            />
            <p>{character.name}</p>
            <div className="btn">
              <button onClick={() => removeFavoriteCharacter(character._id)}>
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteComics;
