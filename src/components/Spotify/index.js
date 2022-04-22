import './Spotify.css';
import {useCallback} from "react";

const Spotify = (props) => {

    // const handleUpdateSelect = useCallback(id => {
    //     props.updateSelect(id)
    // }, [props.updateSelect])

    //cek selected
    console.log(props.selected)

    //masukkin id yang diselect
    const select = (idSelect) => {
        //ngambil semua elemen dari selected terus ditambahin dengan id item yg baru diselect
        console.log("selected id : "+idSelect)
       props.updateSelect([...props.selected, idSelect])
    }

    //masukkin id yg deselect
    const deselect = (idDeselect) => {
        const filterSelected = props.selected.filter((spotify) => {return spotify !== idDeselect} );
       props.updateSelect(filterSelected);
    };

    return(
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
                        <p className="album-name">Album Name : {props.album_name}</p>
                        <p className="total-tracks"> Total Track of Album : {props.total_track_album} </p>
                    </div>
                    <div className="card_button">
                        {props.selected.includes(props.id_item) ? 
                            <button className="button_card" type="button" onClick={() => deselect(props.id_item)}>
                                <a>Deselect</a>
                            </button>
                            :
                            <button className="button_card" type="button" onClick={() => select(props.id_item)}>
                                <a>Select</a>
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Spotify;