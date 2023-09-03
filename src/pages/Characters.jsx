import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import background from "../assets/cover-characters.jpg";
import heartFull from "../assets/heart-full.svg";
import heartBorder from "../assets/heart-border.svg";

const Characters = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [favoritesCharacters, setFavoritesCharacters] = useState();

  const [searchQuery, setSearchQuery] = useState("");
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(20);

  const token = Cookies.get("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--vm2w9vyj7r62.code.run/characters?limit=${limit}&skip=${skip}&name=${searchQuery}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [searchQuery, skip, limit]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const userToken = Cookies.get("token");
      try {
        const fetchFavouriteCharactersId = await axios.get(
          `https://site--marvel-backend--vm2w9vyj7r62.code.run/favoritesCharacters?userToken=${userToken}`
        );
        const characterIds = fetchFavouriteCharactersId.data.favorites;
        console.log("characterIds ==>", characterIds);

        const characterPromises = characterIds.map(async (id) => {
          const response = await axios.get(
            `https://site--marvel-backend--vm2w9vyj7r62.code.run/characters/${id}`
          );
          console.log(response.data);
          return response.data;
        });

        const charactersData = await Promise.all(characterPromises);
        setFavoritesCharacters(charactersData);
        console.log("charactersData ==>", charactersData);
      } catch (error) {
        console.error("Erreur lors de la récupération des favoris :", error);
      }
    };
    fetchFavorites();
  }, [favorites]);

  const isCharacterInFavorites = (characterId) => {
    return favorites.some((favorite) => favorite._id === characterId);
  };

  const addFavoriteCharacter = async (characterId) => {
    const userToken = Cookies.get("token");

    try {
      const response = await axios.post(
        `https://site--marvel-backend--vm2w9vyj7r62.code.run/characters/add-favorite`,
        {
          userToken: userToken,
          favoriteCharacterId: characterId,
        }
      );
      console.log(response.data.message);
      setFavorites([...favorites, { _id: characterId }]);
    } catch (error) {
      console.error("Erreur lors de l'ajout aux favoris :", error);
    }
  };

  const removeFavoriteCharacter = async (characterId) => {
    const userToken = Cookies.get("token");

    try {
      const response = await axios.delete(
        `https://site--marvel-backend--vm2w9vyj7r62.code.run/characters/favorites?userToken=${userToken}&favoriteCharacterId=${characterId}`
      );
      console.log(response.data.message);
      setFavorites(
        favorites.filter((favorite) => favorite._id !== characterId)
      );
    } catch (error) {
      console.error("Erreur lors de la suppression du favori :", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const totalPages = Math.ceil(data.count / limit);

  return (
    <div className="characters-list">
      <div
        className="header"
        style={{
          backgroundImage: `url(${background})`,
        }}
      >
        <div className="overlay"></div>
        <h1>Characters</h1>
      </div>
      <div className="container">
        <div className="search-pagination">
          <input
            className="search-bar"
            type="text"
            placeholder="Search characters"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>
        <div className="list">
          {data.results.map((character) => (
            <div key={character._id} className="item">
              <Link to={`/character/${character._id}`}>
                {console.log(`${character.name} ID ==>`, character._id)}
                <div>
                  <img
                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    alt={`${character.name} thumbnail`}
                  />
                  <h3>{character.name}</h3>
                </div>{" "}
              </Link>
              {token && (
                <div className="fav-button">
                  {isCharacterInFavorites(character._id) ? (
                    <button
                      onClick={() => removeFavoriteCharacter(character._id)}
                    >
                      <img src={heartFull} alt="" />
                    </button>
                  ) : (
                    <button onClick={() => addFavoriteCharacter(character._id)}>
                      <img src={heartBorder} alt="" />
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="pagination">
          <button
            onClick={() => setSkip(Math.max(0, skip - limit))}
            disabled={skip === 0}
          >
            &lt;
          </button>
          <span>
            Page {Math.floor(skip / limit) + 1} sur {totalPages}
          </span>
          <button
            onClick={() => setSkip(skip + limit)}
            disabled={skip + limit >= data.total}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Characters;
