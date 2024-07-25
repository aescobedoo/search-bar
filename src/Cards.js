import React, { useState, useEffect } from "react";

export default function Cards({ posts, input }) {
  const [usernames, setUsernames] = useState({});

  useEffect(() => {
    const fetchUsernames = async () => {
      const uniqueUserIds = [...new Set(posts.map((post) => post.userId))];
      const usernamesData = await Promise.all(
        uniqueUserIds.map(async (userId) => {
          const response = await fetch(
            `https://jsonplaceholder.typicode.com/users/${userId}`
          );
          const data = await response.json();
          return { userId, username: data.username };
        })
      );
      const usernamesMap = usernamesData.reduce((acc, { userId, username }) => {
        acc[userId] = username;
        return acc;
      }, {});
      setUsernames(usernamesMap);
    };

    if (posts.length > 0) {
      fetchUsernames();
    }
  }, [posts]);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(input) ||
      post.body.toLowerCase().includes(input)
  );

  return (
    <div className="postsGrid">
      {filteredPosts.map((post) => (
        <div className="post" key={post.id}>
          <h2>{post.title.toUpperCase()}</h2>
          <h3>{usernames[post.userId]}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}
