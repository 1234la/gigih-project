// import data from './Data';
import Spotify from './components/Spotify/Spotify';
import './components/Spotify/Spotify.css';
import { useEffect, useState } from "react";
import axios from 'axios';

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
  const [Data, setData] = useState([]);

  const getData = async () => {
    await fetch(
      `https://api.spotify.com/v1/search?type=album&include_external=audio&q=${inputVal}`, { 
        method: 'get', 
        headers:{
          'Accept': "application/json",
          'Content-Type': "application/json",
          'Authorization': localStorage.getItem("tokenType")+ " " +localStorage.getItem("accessToken"),
        }
      }
    )
      .then((response) => response.json())
      .then((data) => setData(data.Data))
      .catch((err) => console.log(err));
      console.log(localStorage.getItem("tokenType")+ " " +localStorage.getItem("accessToken"));
  };

  // const getData = async (e) => {
  //     e.preventDefault()
  //     const {data} = await axios.get(`https://api.spotify.com/v1/search?type=album&include_external=audio&q=${inputVal}`, {
  //         headers: {
  //         'Accept': "application/json",
  //         'Content-Type': "application/json",
  //         'Authorization': toString(localStorage.getItem("tokenType")+ " " +localStorage.getItem("accessToken"))
  //         }
  //     })
  //     setData(data.Data)
  // }

  return (
    <div className="App">
      <header className="title">
        <h1 style={{textAlign: "center", margin:"30px"}}>
          Spotify Playlist
        </h1>
        <button onClick = {handleLogin}>Log In</button>
      </header>
      <div className="search">
        <input type="text" onChange={(e) => setInputVal(e.target.value)}/>
        <button type="submit" onClick={getData}>
          Search
        </button>
      </div>
      <div className="wrapper">
        <div className="cards_wrap">
          {console.log(Data)}
        </div>
      </div>
    </div>
  );
}

export default App;
