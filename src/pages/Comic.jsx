import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Comic = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [comicId, setComicId] = useState();
  const [allCharactersData, setAllCharactersData] = useState([]);
  const [charactersData, setCharactersData] = useState([]);
  const [charactersLoading, setCharactersLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--vm2w9vyj7r62.code.run/comic/${id}`
        );
        console.log("response data ==> ", response.data);
        setData(response.data);
        setComicId(response.data._id);
        setIsLoading(false);
      } catch (error) {
        console.log(error.data);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchAllCharacters = async () => {
      try {
        const response = await axios.get(
          "https://site--marvel-backend--vm2w9vyj7r62.code.run/characters"
        );
        const totalCount = response.data.count;
        const characters = response.data.results;
        let allCharacters = characters;

        const remainingPages = Math.ceil(totalCount / 100) - 1;

        for (let page = 1; page <= remainingPages; page++) {
          const nextPageResponse = await axios.get(
            `https://site--marvel-backend--vm2w9vyj7r62.code.run/characters?limit=100&skip=${
              page * 100
            }`
          );
          allCharacters = allCharacters.concat(nextPageResponse.data.results);
        }

        setAllCharactersData(allCharacters);

        if (comicId) {
          const charactersWithComic = allCharacters.filter((character) =>
            character.comics.includes(comicId)
          );
          setCharactersData(charactersWithComic);
          setCharactersLoading(false);

          console.log("charactersWithComic ==>", charactersWithComic);
        }
      } catch (error) {
        console.log(error.data);
      }
    };

    fetchAllCharacters();
  }, [comicId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="comic-details">
      <div className="container">
        <h1>{data.title}</h1>

        <img
          src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
          alt={`${data.name} thumbnail`}
        />
        <p>{data.description}</p>
        <h2>Ils sont présent dans ce comic</h2>

        <div className="characters-in-comic">
          {charactersLoading ? (
            <p>Chargement des personnages en cours...</p>
          ) : (
            <>
              {charactersData.length > 0 ? (
                <div className="list">
                  {charactersData.map((character) => (
                    <Link
                      key={character._id}
                      className="item"
                      to={`/character/${character._id}`}
                    >
                      <div>
                        <img
                          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                          alt={`${character.name} thumbnail`}
                        />
                        <p>{character.name}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p>Aucun character correspondant trouvé dans l'API</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comic;
