import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { setAccessToken } from '../../reducer/accessTokenSlice';
import { setTokenType } from "../../reducer/accessTokenSlice";
import { setUser } from "../../reducer/userSlice";

const CLIENT_ID = 'f354fa333682477f88c2c9f6dd53d33b';
const SPOTIFY_AUTHORIZE_ENDPOINT = 'https://accounts.spotify.com/authorize';
const REDIRECT_URL_AFTER_LOGIN = 'http://localhost:3000/';
const SPACES_DELIMETER = "%20";
const SCOPES = ["playlist-modify-private user-read-private playlist-read-private playlist-read-collaborative"];
const SCOPES_URL_PARAM = SCOPES.join(SPACES_DELIMETER);

const Login = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        if(window.location.hash){
            const {access_token, expires_in, token_type} = getReturnedParamsFromSpotifyAuth(window.location.hash);
            localStorage.clear();
    
          // Set variable disimpan di local storage
            localStorage.setItem("accessToken", access_token);
            localStorage.setItem("tokenType", token_type);
            localStorage.setItem("expiresIn", expires_in);
        }

        // fetch user data function
        const getUserId = async()=>{
            await fetch(
            `https://api.spotify.com/v1/me`, { 
                method: 'get', 
                headers:{
                'Accept': "application/json",
                'Content-Type': "application/json",
                'Authorization': localStorage.getItem("tokenType")+ " " +localStorage.getItem("accessToken"),
                }
            }
            ).then((response) => response.json())
            .then((data) => {
                console.log("User ID: "+ data.id);
                // tanpa redux
                // setUserId(data.id);
                // set user data dengan redux
                dispatch(setUser(data))
            })
            .catch((err) => {
                console.log(err)
            })
        };

        // set token tanpa redux
        // setToken(localStorage.getItem("accessToken"));
        // set token type dengan redux
        dispatch(setTokenType(localStorage.getItem("tokenType")));
        // set token dengan redux
        dispatch(setAccessToken(localStorage.getItem("accessToken")));
        getUserId();
    },[dispatch]);

    // splitting parameters
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

    const handleLogin = () => {
        window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
    };

    return(
        <div className=" flex flex-col justify-center items-center m-0 top-0 bottom-0 left-0 right-0 position absolute">
            <div className='w-1/2'>
                <img
                src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
                alt="logo-spotify"
                className="logo-spotify"
                />
            </div>
            <p className="text-white">You Have to Log In Spotify !!!</p>
            <button className="px-10 py-2 bg-white hover:bg-aqua-400 text-black font-medium text-xs leading-tight uppercase rounded-xl" onClick = {handleLogin} style={{margin:"10px"}}>Log In</button>
        </div>  
    );
};

export default Login;