import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Comics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--marvel-backend--vm2w9vyj7r62.code.run/comics"
        );
        console.log("data ==> ", response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="comics-list">
      <div className="container">
        <h1>Comics</h1>
        <div className="list">
          {data.results.map((comic) => (
            <Link to={`/comic/${comic._id}`} key={comic._id}>
              <div className="item" key={comic._id}>
                <img
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  alt={`${comic.title} thumbnail`}
                />
                <h3>{comic.title}</h3>
                <p>{comic.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comics;
