import data from './Data';
import Spotify from './components/Spotify/Spotify';
import './components/Spotify/Spotify.css';

function App() {
  return (
    <div className="App">
      <header className="title">
        <h1 style={{textAlign: "center", margin:"30px"}}>
          Spotify Playlist
        </h1>
      </header>
      <div className="wrapper">
      <div className="cards_wrap">
        {data.map((d)=>(
            <Spotify name={d.name} 
            image={d.album.images[0].url} 
            album={d.album.name} 
            artist={d.artists[0].name}
            url={d.album.artists[0].external_urls.spotify}
          />
          ))}
      </div>
      </div>
    </div>
  );
}

export default App;
