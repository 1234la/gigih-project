import data from './Data';
import Spotify from './components/Spotify/Spotify';

function App() {
  return (
    <div className="App">
      <header className="title">
        <h1>
          Spotify Playlist
        </h1>
      </header>
      <Spotify name={data.name} 
        image={data.album.images[0].url} 
        album={data.album.name} 
        artist={data.artists[0].name}
        url={data.album.artists[0].external_urls.spotify}
      />
    </div>
  );
}

export default App;
