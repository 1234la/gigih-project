import Spotify from './components/Spotify/Spotify';
import { useEffect, useState } from "react";
import swal from 'sweetalert';
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
  const [token, setToken] = useState("");
  const [inputVal, setInputVal] = useState("");
  const [spotifyData, setSpotifyData] = useState([]);
  const [select, setSelect] = useState([]);

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

  //set token
    setToken(localStorage.getItem("accessToken"));
  },[]);

  const handleLogin = () => {
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
  };

  const handleLogout = () => {
      setToken("");
      window.localStorage.removeItem("accessToken");
  };
  
  //fetch API data
  const getData = async () => {
    console.log("cek input:" + inputVal);
    await fetch(
      `https://api.spotify.com/v1/search?type=track&include_external=audio&q=${inputVal}`, { 
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
        setSpotifyData(data.tracks.items);
      })
      .catch((err) => {
        console.log(err)
        if (err.response) {
            console.log("--------------------------------------------------")
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
        } else if (err.request) {
            console.log("*************************")
            console.log(err.request);
        } else {

            console.log("++++++++++++++++++++++++")
            console.log('Error', err.message);
        }
        console.log(err.config);
        swal("ERROR", "terdapat kesalahan saat mengambil data!", "error");
      });
      console.log(localStorage.getItem("tokenType")+ " " +localStorage.getItem("accessToken"));
  };
 
  return (
    <div className="App">
      <header className="title" style={{textAlign: "center"}}>
        <h1 style={{margin:"30px"}}>
          Search Songs, Artists, or Album on Spotify
        </h1>

      {/* cek login  */}
      {!token || !window.localStorage.getItem("tokenType") ? 
        <button onClick = {handleLogin} style={{margin:"10px"}}>Log In</button>
        :  
        <button onClick = {handleLogout} style={{margin:"10px"}}>Log Out</button> 
      }

      {token ?  
        <div className="search">
          <input type="text" onChange={(e) => setInputVal(e.target.value)}/>
          <button type="submit" onClick={getData}>
            Search 
          </button>
        </div>
        : <p>You Have to Log In Spotify !!!</p>
      }

      </header>
      <div className="wrapper">
        <div className="cards_wrap">
        {spotifyData.map((d, id)=>{
          // {select.map((s) => {
          //   console.log("ini s:"+s)
          //   console.log("ini id:"+d.id)
          //   if(d.id === s){
          //       setStatus(true)
          //   }
          //   else{
          //       setStatus(false)
          //       }
          //   })
          //   console.log("app.js map select "+status)
          // }
          return(
              <Spotify 
                key = {id}
                name={d.name} 
                image={d.album.images[1].url} 
                album_name = {d.album.name}
                total_track_album = {d.album.total_tracks} 
                artist={d.artists[0].name}
                url={d.external_urls.spotify}
                id_item={d.id}
                selected={select}
                updateSelect={setSelect}
              />
            )
          })
        }
        </div>
      </div>
    </div>
  );
}

export default App;
