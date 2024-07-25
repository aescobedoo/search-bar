import React, { useState, useEffect } from "react";

export default function SearchBar({ handleInput }) {
  return (
    <div className="header">
      <div id="searchWrap">
        <span>🔎</span>
        <input type="search" placeholder="finder" onInput={handleInput} />
      </div>
    </div>
  );
}
