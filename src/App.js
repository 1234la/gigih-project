import data from './Data';
import Spotify from './components/Spotify/Spotify';

function App() {
  return (
    <div className="App">
      <header className="title">
        <h1 style={{textAlign: "center"}}>
          Spotify Playlist
        </h1>
      </header>
      {data.map((d)=>(
        <Spotify name={d.name} 
        image={d.album.images[0].url} 
        album={d.album.name} 
        artist={d.artists[0].name}
        url={d.album.artists[0].external_urls.spotify}
      />
      ))}
    </div>
  );
}

export default App;
