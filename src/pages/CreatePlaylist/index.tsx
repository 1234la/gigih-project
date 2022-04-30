import { useState } from 'react';
import { useSelector } from 'react-redux';
import SongCard from '../../components/SongCard';
import Form from '../../components/FormCreatePlaylist';

import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const CreatePlaylist = () => {

    const token = useSelector((state:any) => state.accessToken.value);
    const tokenType = useSelector((state:any)=> state.accessToken.type);
    const userId = useSelector((state:any) => state.user.data.id);

    const [inputVal, setInputVal] = useState("");
    const [spotifyData, setSpotifyData] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    // fetch API data search spotify 
    const getData = async() => {
        console.log("cek input:" + inputVal);
        await fetch(
        `https://api.spotify.com/v1/search?type=track&include_external=audio&q=${inputVal}`, { 
            method: 'get', 
            headers:{
            'Accept': "application/json",
            'Content-Type': "application/json",
            'Authorization': tokenType+ " " +token,
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
            Swal.fire({icon: 'error', title: 'Oops...', text: 'Anda belum mengisi field pencarian!!!', width: 450});
        });
        //cek authorization
        console.log("cek auth: "+localStorage.getItem("tokenType")+ " " + token);
    };

    return(
        <div>
            <header className="title" style={{textAlign: "center"}}>
                <div>
                    <h1 className="text-aqua-400 font-semibold text-2xl" style={{margin:"30px"}}> Create Your Playlist !</h1>
                </div>
                <div className="flex justify-center">
                    <div className="mb-3 xl:w-1/3">
                        <div className="flex w-full">
                            <input type="search"
                                className="flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal bg-white border border-solid border-gray-300 rounded-l transition ease-in-out m-0 focus:text-black focus:bg-white focus:border-aqua-400 focus:outline-none"
                                placeholder="Search music, album, artis...."
                                aria-label="Search"
                                data-testid="input-search"
                                onChange={(e) => setInputVal(e.target.value)}/>
                            <button className="px-6 py-2 bg-aqua-400 text-black font-medium text-xs leading-tight uppercase rounded-r focus:outline-none focus:ring-0 transition duration-150 ease-in-out hover:bg-aqua-500" type="button" onClick={getData} data-testid="button-search">
                                <FontAwesomeIcon 
                                icon={faMagnifyingGlass} 
                                // size="xl"
                                /> 
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            {selectedItems[0]?
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
                {spotifyData.map((d:any)=>{
                return token?(
                    <SongCard
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