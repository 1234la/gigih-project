import './Spotify.css';

export default function Spotify(props){
    return(
        // <div className="cards_wrap">
            <div className="card_item">
                <div className="card_inner">
                    <div className="card_top">
                    <img src={props.image} alt="car" />
                    </div>
                    <div className="card_bottom">
                        <div className="card_title">
                            <b>{props.name}</b>
                        </div>
                        <div className="card_info">
                            <p className="artist">Artist Name : {props.artist}</p>
                            <p className="total-tracks"> Total Track : 
                             {props.total_track}
                            </p>
                        </div>
                        <div className="card_button">
                            <button className="button_card" type="button"><a href={props.url}>Select</a></button>
                        </div>
                    </div>
                </div>
            </div>
        // </div> 
    );
};