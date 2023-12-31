import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Character = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [characterData, setCharacterData] = useState({});
  const [comicData, setComicData] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchCharacterData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--vm2w9vyj7r62.code.run/characters/${id}`
        );
        setCharacterData(response.data);
        setIsLoading(false);

        fetchComicsData(response.data.comics || []);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchComicsData = async (comics) => {
      try {
        const comicsData = await Promise.all(
          comics.map(async (comicId) => {
            const response = await axios.get(
              `https://site--marvel-backend--vm2w9vyj7r62.code.run/comic/${comicId}`
            );
            console.log("response.data =>>", response.data);
            return response.data;
          })
        );
        console.log("comicsData ==>", comicsData);
        setComicData(comicsData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCharacterData();
  }, [id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="character-page minheight">
      <div className="details">
        <img
          src={`${characterData.thumbnail.path}.${characterData.thumbnail.extension}`}
          alt={`${characterData.name} thumbnail`}
        />

        <div className="detail-right">
          <h1>{characterData.name}</h1>
          <p>{characterData.description}</p>
          <h3>Retrouvez ce personnage dans ces comics :</h3>
          <div className="comics-list">
            <div className="character-comics-list list">
              {comicData.map((comic) => (
                <div className="character-comic item" key="comic._id">
                  <Link to={`/comic/${comic._id}`} className="item">
                    <img
                      src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                      alt={`${comic.name} thumbnail`}
                    />
                    <p key={comic._id}>{comic.title}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Character;
