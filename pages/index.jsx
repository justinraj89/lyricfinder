import { useState } from "react";
import axios from "axios";
//=================================

function Home() {
  const [inputSearch, setInputSearch] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const [lyrics, setLyrics] = useState("");
  //------------------------------------------------------
  const getSearchResults = async () => {
    try {
      const res = await axios.get("api/search/", {
        params: { inputSearch },
      });
      const { data } = res;
      console.log(data, "<--DATA");
      setSearchResults(data.hits);
    } catch (error) {
      console.error(error);
    }
  };

  const getLyrics = async (id) => {
    try {
      setSearchResults(""); // Remove the results
      const res = await axios.get("api/lyrics/", {
        params: { id },
      });
      const { data } = res;
      console.log(data, "DATA FROM GET LYRICS FUNCTION");
      setLyrics(data.lyrics);
    } catch (error) {
      console.error(error);
    }
  };

  //------------------------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    getSearchResults();
  };

  const handleChange = (e) => {
    setInputSearch(e.target.value);
    setSearchResults("");
    setLyrics("");
  };

  return (
    <div className="flex flex-col md:px-12 px-0 relative bg-gray-900 font-serif items-center min-h-screen">
      <h1 className="text-6xl font-bold text-stone-50 mt-10">
        <span className="text-rose-400 italic">Lyrics</span> Finder
      </h1>
      <h2 className="text-stone-50 text-2xl font-light mt-6">
        Music lyrics on demand
      </h2>

      <form
        className="sm:mx-auto mt-20 justify-center sm:w-full sm:flex"
        onSubmit={handleSubmit}
      >
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

      {searchResults && (
        <div className="mt-10">
          <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {searchResults.map((song) => (
              <div key={song.result.id} className="pt-6">
                <div className="flow-root bg-transparent px-4 pb-8">
                  <div className="-mt-6">
                    <div className="flex items-center justify-center">
                      <span className="p-2">
                        <img
                          src={song.result.song_art_image_thumbnail_url}
                          className="w-full h-full rounded-md"
                          alt={song.result.title}
                        />
                      </span>
                    </div>
                    <div className="text-center justify-center items-center">
                      <h3 className="mt-4 text-lg font-bold w-full break-words overflow-x-auto text-stone-50 tracking-tight">
                        {song.result.title}
                      </h3>
                      <span className="mt-2 text-sm text-stone-400 block">
                        {song.result.artist_names}
                      </span>
                      <button
                        className="mt-5 text-rose-400 text-active"
                        onClick={() => {
                          getLyrics(song.result.id);
                        }}
                      >
                        Get Lyrics &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {lyrics && (
        <div className="mt-10 max-w-3xl">
          <h2 className="text-2xl font-bold text-center text-stone-50">
            Lyrics for{' '} 
            <span className="text-rose-400">{lyrics.tracking_data.title}</span>
          </h2>
         <p className="mt-6 leading-loose text-stone-50 text-xl">
            {lyrics.lyrics.body.plain}
          </p> 
        </div>
      )}
    </div>
  );
}

export default Home;
