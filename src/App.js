import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import SearchBar from "./SearchBar";
import "./App.css";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  const handleInput = ({target}) => {
      setValue(target.value.toLowerCase());
  }

  return (
    <div className="App">
      <SearchBar handleInput={handleInput}/>
      <Cards posts={posts} input={value}/>
    </div>
  );
}
