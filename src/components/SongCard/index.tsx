import './SongCard.css';

type songCard = {
    name: string,
    image: string,
    artist: string,
    album_name: string,
    id_item: string,
    total_track_album: number,
    url: string,
    selected: string[],
    updateSelect: any,
}

const SongCard = (props:songCard) => {

    //cek selected
    console.log(props.selected)

    //masukkin id items yang diselect untuk buat playlist
    const select = (idSelect:string) => {
        //ambil semua id item dari array selected terus ditambahin dengan id item yg baru diselect
        console.log("selected id : "+idSelect)
        const combineIdSelected= "spotify:track:"+idSelect;
        props.updateSelect([...props.selected, combineIdSelected])
    }

    //masukkin id items yg tidak di deselect
    const deselect = (idDeselect:string) => {
        const combineIdDelected= "spotify:track:"+ idDeselect;
        //melakukan update item yang diselect dengan filter id
        // const filterSelected = props.selected.filter((idSelectedItem) => {return idSelectedItem !== idDeselect} );
        const filterSelected = props.selected.filter((idSelectedItem:string) => {return idSelectedItem !== combineIdDelected} );
        props.updateSelect(filterSelected);
    };

    return(
        <div className="card_item">
            <div className="card_inner">
                <div className="card_top">
                    <img src={props.image} alt="songimage" data-testid="song-image" />
                </div>
                <div className="card_bottom">
                    <div className="card_title" data-testid="song-title">
                        <b>{props.name}</b>
                    </div>
                    <p className="artist mt-2" data-testid="song-artist">- {props.artist} -</p>
                    <p className="album-name" data-testid="song-album">Album: {props.album_name}</p>
                    {/* <div className="card_info">
                        <p className="artist">Artist Name : {props.artist}</p>
                        <p className="album-name">Album Name : {props.album_name}</p>
                        <p className="total-tracks"> Total Track of Album : {props.total_track_album} </p>
                    </div> */}
                    <div className="card_button" data-testid="song-button">
                        {/* cari apakah ada yang sama id di array selected dengan includes */}
                        {props.selected.includes("spotify:track:"+props.id_item) ? 
                            <button className="bg-aqua-500  rounded-lg mt-1.5 px-10 py-1" type="button" onClick={() => deselect(props.id_item)}>
                                Deselect
                            </button>
                            :
                            <button className="bg-aqua-400 rounded-lg mt-1.5 px-10 py-1 hover:bg-aqua-500" type="button" onClick={() => select(props.id_item)}>
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