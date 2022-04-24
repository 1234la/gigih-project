
const PlaylistCard = (props) => {
    return(
        <div className="flex justify-center m-3">
            <div className="rounded-lg shadow-lg bg-aqua-500 bg-opacity-50 max-w-sm">
                <a href="#!">
                    <img className="rounded-t-lg " src={props.image} alt=""/>
                </a>
                <div className="p-6">
                    <h5 className="text-aqua-400 text-xl font-medium mb-2 ">{props.name}</h5>
                    <p className="text-aqua-500 text-base mb-4">
                        {props.desc}
                    </p>
                        <a className="block" href={props.url} target="_blank" rel="noreferrer">
                            <button type="button" className=" inline-block px-6 py-2.5 bg-aqua-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-aqua-400 hover:shadow-lg focus:bg-aqua-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-aqua-500 active:shadow-lg transition duration-150 ease-in-out"> Play </button>
                        </a>
                    
                </div>
            </div>
        </div>
    );
}

export default PlaylistCard;