import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Characters = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(20); // Adjust the limit as needed

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const totalPages = Math.ceil(data.count / limit);

  return (
    <div className="characters-list">
      <div className="container">
        <h1>Characters</h1>

        <div className="pagination-simple">
          <button
            onClick={() => setSkip(Math.max(0, skip - limit))}
            disabled={skip === 0}
          >
            Précédent
          </button>
          <span>
            Page {Math.floor(skip / limit) + 1} sur {totalPages}
          </span>
          <button
            onClick={() => setSkip(skip + limit)}
            disabled={skip + limit >= data.total}
          >
            Suivant
          </button>
        </div>

        <input
          type="text"
          placeholder="Search characters"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />

        <div className="list">
          {data.results.map((character) => (
            <Link to={`/character/${character._id}`} key={character._id}>
              <div className="item">
                <img
                  src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                  alt={`${character.name} thumbnail`}
                />
                <h3>{character.name}</h3>
                <p>{character.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Characters;
