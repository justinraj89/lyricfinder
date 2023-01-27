import { useState } from "react";
import axios from 'axios';
//=================================

function Home() {

  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState('');
  const [lyrics, setLyrics] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  const handleChange = (e) => {
    setSearch(e.target.value);
    setSearchResults('');
    setLyrics('');
  }


  
  return (
    <div className="flex flex-col md:px-12 px-0 relative bg-gray-900 font-serif items-center min-h-screen">
      <h1 className="text-6xl font-bold text-stone-50 mt-10">
        <span className="text-rose-400 italic">Lyrics</span> Finder
      </h1>
      <h2 className="text-stone-50 text-2xl font-light mt-6">
        Music lyrics on demand
      </h2>

      <form className="sm:mx-auto mt-20 justify-center sm:w-full sm:flex" onSubmit={handleSubmit}>
        <input
          type="text"
          className="flex w-full sm:w-1/3 rounded-lg px-5 py-3 text-black font-semibold focus:outline-none focus:ring-2 ring-rose-400 focus:ring-active"
          placeholder="Enter a track or artist name"
          onChange={handleChange}
        />
        <div className="mt-4 sm:mt-0 sm:ml-3">
          <button
            className="block w-full rounded-lg px-5 py-3 bg-rose-400 text-base text-stone-50 font-bold hover:text-active hover:bg-primary sm:px-10"
            type="submit"
          >
            Search
          </button>
        </div>
      </form>

    </div>
  );
}

export default Home;
