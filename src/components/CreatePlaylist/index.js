import { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";

const CreatePlaylist = ({ token, userId, songUris, updateSongUris }) => {
    const [playlistId, setPlaylistId] = useState("");
    const [form, setForm] = useState({
        title: "",
        description: "",
    });

    // run addSong function when playlistId is set
    useEffect(() => {
          // add songs to the playlist
          const addSongs = async (id) => {
            console.log("cek SongUris: "+songUris);
            await axios
            .post(
                `https://api.spotify.com/v1/playlists/${id}/tracks`,
                {
                uris: [...songUris],
                },
                {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                }
            )
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
        };

        // clear data selected if create playlist done
        const clearSongUris = () => {
            updateSongUris([]);
        };

        if (playlistId) {
            addSongs(playlistId);
            clearSongUris();
        }
    }, [playlistId, songUris, token, updateSongUris]);

    // get the form data
    const handleForm = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    // handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.title.length > 10) {
            await axios
            .post(
                `https://api.spotify.com/v1/users/${userId}/playlists`,
                {
                name: form.title,
                description: form.description,
                public: false,
                collaborative: false,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {
                console.log("playlist Id:" + response.data.id);
                setPlaylistId(response.data.id);
            })
            .catch((error) => {
                console.log(error);
            });

        setForm({ title: "", description: "" });
        // alert("Successfully created playlist");
        swal("Successs!", "Successfully created playlist", "success")
        } else {
        // alert("Title must be more than 10 characters");
        swal("Warning", "Title must be more than 10 characters", "warning")
        }
    };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center">
        <div className="mb-3 xl:w-96 bg-aqua-400/[.09] border-2 border-aqua-400 p-5 rounded-lg">
          <div className="flex-col w-full mb-4">
            <label htmlFor="title" className="text-aqua-400 text-md font-medium">
              Title
            </label>
            <input
              type="text"
              className="min-w-0 w-full px-3 py-1.5 text-base font-normal bg-white border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-aqua-400 focus:outline-none"
              placeholder="Title of Playlist"
              name="title"
              value={form.title}
              autoComplete="off"
              onChange={handleForm}
            />
          </div>
          <div className="flex-col w-full mb-4">
            <label htmlFor="description" className="text-aqua-400 text-md font-medium">
              Description
            </label>
            <textarea
              type="text"
              className="min-w-0 w-full px-3 py-1.5 text-base font-normal bg-white border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-aqua-400 focus:outline-none"
              placeholder="Description"
              name="description"
              value={form.description}
              onChange={handleForm}
            />
          </div>
          <div>
            <button
              id="submit"
              type="submit"
              className="py-2 px-4 bg-aqua-400 rounded text-black font-medium hover:bg-aqua-500 text-xs leading-tight"
            >
              Create Playlist
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreatePlaylist;