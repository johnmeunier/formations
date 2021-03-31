import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const ApiPost = () => {
  const [post, setPost] = useState({});
  const { postId } = useParams();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(function (response) {
        return response.json();
      })
      .then((response) => {
        setPost(response);
      });
  }, []);

  return (
    <>
      <div className="header--sub">
        <h2>{post.title}</h2>
      </div>
      <div className="container">
        <div className="info">
          <h3 className="details__name">{post.title}</h3>
          <p className="details__description">{post.body}</p>
        </div>
      </div>
    </>
  );
};
