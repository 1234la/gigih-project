import './SongCard.css';

const SongCard = (props) => {

    //cek selected
    console.log(props.selected)

    //masukkin id items yang diselect untuk buat playlist
    const select = (idSelect) => {
        //ambil semua id item dari array selected terus ditambahin dengan id item yg baru diselect
        console.log("selected id : "+idSelect)
        const combineIdSelected= "spotify:track:"+idSelect;
        //props.updateSelect([...props.selected, idSelect])
        props.updateSelect([...props.selected, combineIdSelected])
    }

    //masukkin id items yg tidak di deselect
    const deselect = (idDeselect) => {
        const combineIdDelected= "spotify:track:"+ idDeselect;
        //melakukan update item yang diselect dengan filter id
        // const filterSelected = props.selected.filter((idSelectedItem) => {return idSelectedItem !== idDeselect} );
        const filterSelected = props.selected.filter((idSelectedItem) => {return idSelectedItem !== combineIdDelected} );
        props.updateSelect(filterSelected);
    };

    return(
        <div className="card_item">
            <div className="card_inner">
                <div className="card_top">
                    <img src={props.image} alt="songimage" />
                </div>
                <div className="card_bottom">
                    <div className="card_title">
                        <b>{props.name}</b>
                    </div>
                    <p className="artist">{props.artist}</p>
                    {/* <div className="card_info">
                        <p className="artist">Artist Name : {props.artist}</p>
                        <p className="album-name">Album Name : {props.album_name}</p>
                        <p className="total-tracks"> Total Track of Album : {props.total_track_album} </p>
                    </div> */}
                    <div className="card_button">
                        {/* cari apakah ada yang sama id di array selected dengan includes */}
                        {props.selected.includes("spotify:track:"+props.id_item) ? 
                            <button className="bg-aqua-500  rounded-lg mt-1.5 px-10 py-2.5" type="button" onClick={() => deselect(props.id_item)}>
                                Deselect
                            </button>
                            :
                            <button className="bg-aqua-400  rounded-lg mt-1.5 px-10 py-2.5 hover:bg-aqua-500" type="button" onClick={() => select(props.id_item)}>
                                Select
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SongCard;