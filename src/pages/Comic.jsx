import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Comic = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:3000/comic/${id}`);
        console.log("response data ==> ", response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.data);
      }
    };
    fetchData();
  }, [id]);

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
      </div>
    </div>
  );
};

export default Comic;
