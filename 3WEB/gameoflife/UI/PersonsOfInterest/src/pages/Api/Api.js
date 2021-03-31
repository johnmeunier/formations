import { useState, useEffect } from "react";

export const Api = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(function (response) {
        return response.json();
      })
      .then((response) => {
        setPosts(response);
      });
  }, []);

  return (
    <>
      <div className="header--sub">
        <h2>Api</h2>
      </div>
      <div className="cards">
        {posts.map(({ title, body }) => (
          <div className="card">
            <h3 className="card__name">{title}</h3>
            <p className="card__content">{body}</p>
          </div>
        ))}
      </div>
      ;
    </>
  );
};
