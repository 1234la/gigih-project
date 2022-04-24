import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import PlaylistCard from '../../components/PlaylistCard';

const Playlist = () => {
    const token = useSelector((state) => state.accessToken.value);
    const [playlist, setPlaylist] = useState([]);

    useEffect (() => {
        const getPlaylist = async()=>{
            await fetch(
            `https://api.spotify.com/v1/me/playlists?limit=50`, { 
                method: 'get', 
                headers:{
                'Accept': "application/json",
                'Content-Type': "application/json",
                'Authorization': localStorage.getItem("tokenType")+ " "+localStorage.getItem("accessToken"),
                }
            }
            ).then((response) => response.json())
            .then((data) => {
                setPlaylist(data.items);
            })
            .catch((err) => {
                console.log(err)
            })
        };
        getPlaylist();
    },[]);

    return(
        <div>
            <header className="title" style={{textAlign: "center"}}>
                <div>
                <h1 className="text-aqua-400 font-semibold text-2xl" style={{margin:"30px"}}> My Spotify Playlist </h1>
                </div>
            </header>
            <div className="wrapper">
                <div className="cards_wrap">
                {playlist.map((d,id)=>{
                    console.log("cek data playlist: "+d.external_urls.spotify)
                return token?(
                    <PlaylistCard
                        key={d.id}
                        image={d.images[0].url}
                        name={d.name}
                        desc={d.description}
                        url={d.external_urls.spotify}
                    />
                    ):<></>
                })
                }
                </div>
            </div>
        </div>
    );
}

export default Playlist;