import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Characters = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--vm2w9vyj7r62.code.run/characters/?name=${searchQuery}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [searchQuery]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="characters-list">
      {/* <div className="container"> */}
      <h1>Personnages</h1>
      <input
        type="text"
        placeholder="Search characters"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
      />
      <div className="list">
        {data?.results?.map((character) => (
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
        {/* </div> */}
      </div>
    </div>
  );
};

export default Characters;
