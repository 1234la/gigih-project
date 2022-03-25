import './Spotify.css';

export default function Spotify(props){
    return(
        <div className="container">
            <img src={props.image} alt="image track"/>
            <div className="track-details">
                <h3 id="title">{props.name}</h3>
                <p id="artist"><b>Artist : </b>{props.artist}</p>
                <p id="album"><b>Album : </b>{props.album}</p>
                <button type="button"><a href={props.url}>Select</a></button>
            </div>
      </div>
    );
};