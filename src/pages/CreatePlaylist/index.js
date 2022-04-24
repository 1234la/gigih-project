import { useState } from 'react';
import { useSelector } from 'react-redux';
// import { useSelector, useDispatch } from 'react-redux';
// import { setAccessToken } from '../../reducer/accessTokenSlice';
import SongCard from '../../components/SongCard';
import Form from '../../components/CreatePlaylist';

import swal from 'sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const CreatePlaylist = () => {

    const token = useSelector((state) => state.accessToken.value);
    const userId = useSelector((state) => state.user.data.id);
    // const dispatch = useDispatch();

    // const [userId, setUserId] = useState("");
    const [inputVal, setInputVal] = useState("");
    const [spotifyData, setSpotifyData] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    // const handleLogout = () => {
    //     // tanpa redux
    //     //setToken("");
    //     // dengan redux
    //     dispatch(setAccessToken(""));
    //     window.localStorage.clear();
    //     //window.localStorage.removeItem("accessToken");
    // };

    // fetch API data search spotify 
    const getData = async() => {
        console.log("cek input:" + inputVal);
        await fetch(
        `https://api.spotify.com/v1/search?type=track&include_external=audio&q=${inputVal}`, { 
            method: 'get', 
            headers:{
            'Accept': "application/json",
            'Content-Type': "application/json",
            'Authorization': localStorage.getItem("tokenType")+ " " +token,
            }
        }
        ).then((response) => response.json())
        .then((data) => {
            console.log(data);
            setSpotifyData(data.tracks.items);
            // getUserId();
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
        //cek authorization
        console.log("cek auth: "+localStorage.getItem("tokenType")+ " " + token);
    };

    // // fetch user data
    // const getUserId = async()=>{
    //     await fetch(
    //     `https://api.spotify.com/v1/me`, { 
    //         method: 'get', 
    //         headers:{
    //         'Accept': "application/json",
    //         'Content-Type': "application/json",
    //         'Authorization': localStorage.getItem("tokenType")+ " " +localStorage.getItem("accessToken"),
    //         }
    //     }
    //     ).then((response) => response.json())
    //     .then((data) => {
    //         console.log("User ID: "+ data.id);
    //         setUserId(data.id);
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     })
    // };

    return(
        <div>
            <header className="title" style={{textAlign: "center"}}>
                <div>
                <h1 className="text-aqua-400 font-semibold text-2xl" style={{margin:"30px"}}> Create Your Playlist !</h1>
                {/* <button className="px-6 py-2 bg-aqua-400  hover:bg-aqua-500 text-black font-medium text-xs leading-tight uppercase rounded" onClick = {handleLogout} style={{margin:"10px"}}>Log Out</button> */}
                </div>
                {token ?  
                    <div className="flex justify-center">
                        <div className="mb-3 xl:w-1/3">
                            <div className="flex w-full">
                                <input type="search"
                                    className="flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal bg-white border border-solid border-gray-300 rounded-l transition ease-in-out m-0 focus:text-black focus:bg-white focus:border-aqua-400 focus:outline-none"
                                    placeholder="Search"
                                    aria-label="Search"
                                    onChange={(e) => setInputVal(e.target.value)}/>
                                <button className="px-6 py-2 bg-aqua-400 text-black font-medium text-xs leading-tight uppercase rounded-r focus:outline-none focus:ring-0 transition duration-150 ease-in-out hover:bg-aqua-500" type="button" onClick={getData}>
                                    <FontAwesomeIcon icon={faMagnifyingGlass} size="xl"/>
                                </button>
                            </div>
                        </div>
                    </div>
                : <></>
                }
            </header>
            {token && selectedItems[0]?
                <div>
                <Form
                    token={token}
                    userId={userId}
                    songUris={selectedItems}
                    updateSongUris={setSelectedItems}
                />
                </div>:
                <div></div>
            }
            <div className="wrapper">
                <div className="cards_wrap">
                {spotifyData.map((d, id)=>{
                return token?(
                    <SongCard
                        key = {id}
                        name={d.name} 
                        image={d.album.images[1].url} 
                        album_name = {d.album.name}
                        total_track_album = {d.album.total_tracks} 
                        artist={d.artists[0].name}
                        url={d.external_urls.spotify}
                        id_item={d.id}
                        selected={selectedItems}
                        updateSelect={setSelectedItems}
                    />
                    ):<></>
                })
                }
                </div>
            </div>
        </div>
    );
}

export default CreatePlaylist;