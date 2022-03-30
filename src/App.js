import Spotify from './components/Spotify/Spotify';
import { useEffect, useState } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import {InputGroup, FormControl } from 'react-bootstrap/';

const CLIENT_ID = 'f354fa333682477f88c2c9f6dd53d33b';
const SPOTIFY_AUTHORIZE_ENDPOINT = 'https://accounts.spotify.com/authorize';
const REDIRECT_URL_AFTER_LOGIN = 'http://localhost:3000/';
const SPACES_DELIMETER = "%20";
const SCOPES = ["playlist-modify-private"];
const SCOPES_URL_PARAM = SCOPES.join(SPACES_DELIMETER);

const getReturnedParamsFromSpotifyAuth = (hash) => {
  const stringAfterHashtag = hash.substring(1);
  const paramsInUrl = stringAfterHashtag.split("&");
  const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
    console.log(currentValue);
    const [key, value] = currentValue.split("=");
    accumulater[key] = value;
    return accumulater;
  }, {});
  return paramsSplitUp;
}

function App() {
  useEffect(() => {
    if(window.location.hash){
      const {access_token, expires_in, token_type} = getReturnedParamsFromSpotifyAuth(window.location.hash);
      // console.log(currentValue);
      localStorage.clear();

      // Set variable disimpan di local storage
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("tokenType", token_type);
      localStorage.setItem("expiresIn", expires_in);
    }
  },[]);

  const handleLogin = () => {
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
  };
  
  const [inputVal, setInputVal] = useState("");
  const [spotifyData, setSpotifyData] = useState([]);

  //fetch API data
  const getData = async () => {
    console.log("cek input:" + inputVal);
    await fetch(
      `https://api.spotify.com/v1/search?type=album&include_external=audio&q=${inputVal}`, { 
        method: 'get', 
        headers:{
          'Accept': "application/json",
          'Content-Type': "application/json",
          'Authorization': localStorage.getItem("tokenType")+ " " +localStorage.getItem("accessToken"),
        }
      }
    ).then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSpotifyData(data.albums.items);
      })
      .catch((err) => console.log(err));
      console.log(localStorage.getItem("tokenType")+ " " +localStorage.getItem("accessToken"));
  };

  return (
    <div className="App">
      <header className="title" style={{textAlign: "center"}}>
        <h1 style={{margin:"30px"}}>
          Search Album in Spotify
        </h1>
        <button onClick = {handleLogin} style={{margin:"10px"}}>Log In</button>
        <div className="search">
          <input type="text" onChange={(e) => setInputVal(e.target.value)}/>
          <button type="submit" onClick={getData}>
            Search 
          </button>
      </div>
      </header>
      <div className="wrapper">
        <div className="cards_wrap">
        {spotifyData.map((d, id)=>(
            <Spotify 
              key = {id}
              name={d.name} 
              image={d.images[1].url} 
              total_track = {d.total_tracks} 
              artist={d.artists[0].name}
              url={d.external_urls.spotify}
            />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
