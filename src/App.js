// import logo from './logo.svg';
import './App.css';
import data from './Data';
import './Spotify.css';

function App() {
  return (
    <div className="App">
      <header className="title">
        <h1>
          Spotify Playlist
        </h1>
      </header>
      <div className="container">
        <img
          src={data.album.images[0].url}
          alt="image track"
        />
        <div className="track-details">
          <h3 id="title">{data.name}</h3>
          <p id="artist"><b>Artist : </b>{data.artists[0].name}</p>
          <p id="album"><b>Album : </b>{data.album.name}</p>
          <button><a href={data.album.artists[0].external_urls.spotify}>Select</a></button>
        </div>
      </div>
    </div>
  );
}

export default App;
