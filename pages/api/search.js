import axios from "axios";
//=====================================

async function handler(req, res) {
  const options = {
    method: "GET",
    url: "https://genius-song-lyrics1.p.rapidapi.com/search/",
    params: { q: req.query.inputSearch, per_page: "9", page: "1" },
    headers: {
      "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
      "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
    },
  };

  try {
    let response = await axios(options);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
  }
}

export default handler;
