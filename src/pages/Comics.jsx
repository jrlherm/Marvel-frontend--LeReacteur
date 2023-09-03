import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import background from "../assets/cover-comics.jpg";
import Cookies from "js-cookie";

const Comics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(48);

  const token = Cookies.get("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--vm2w9vyj7r62.code.run/comics?limit=${limit}&skip=${skip}&title=${searchQuery}`
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
    <div className="comics-list">
      <div
        className="header"
        style={{
          backgroundImage: `url(${background})`,
        }}
      >
        <div className="overlay"></div>
        <h1>Comics</h1>
      </div>
      <div className="container">
        <div className="search-pagination">
          <input
            className="search-bar"
            type="text"
            placeholder="Search comics"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>
        <div className="list">
          {data.results.map((comic) => (
            <Link to={`/comic/${comic._id}`} key={comic._id}>
              <div className="item" key={comic._id}>
                <img
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  alt={`${comic.title} thumbnail`}
                />
                <h3>{comic.title}</h3>
              </div>
            </Link>
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

export default Comics;
