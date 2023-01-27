import axios from "axios";
//=================================================


async function handler(req, res) {

  const options = {
    method: 'GET',
    url: 'https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/',
    params: {id: req.query.id},
    headers: {
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
    }
  };
  try {
    let response = await axios(options);
    console.log('RESPONSE FROM API', response)
    res.status(200).json(response.data);
  } catch (error) {
      console.error(error);
  }
}

export default handler;


// const options = {
//   method: "GET",
//   url: `https://genius-song-lyrics1.p.rapidapi.com/songs/${req.query.id}/lyrics`,
//   headers: {
//     "x-rapidapi-host": "genius-song-lyrics1.p.rapidapi.com",
//     "x-rapidapi-key": process.env.RAPIDAPI_KEY,
//   },
// };