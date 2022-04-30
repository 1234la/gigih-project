import { render, screen } from '@testing-library/react';
import SongCard from './index';
import songData from "../../mocks/dataAPI";

const renderSongCard = (
    <SongCard
        name={songData[0]?.name} 
        image={songData[0]?.album?.images[1]?.url} 
        album_name = {songData[0]?.album?.name}
        total_track_album = {songData[0]?.album?.total_tracks} 
        artist={songData[0]?.artists[0]?.name}
        url={songData[0]?.external_urls?.spotify}
        id_item={songData[0]?.id}
        selected={"spotify:track:"+songData[0]?.id}
        updateSelect={"spotify:track:"+songData[0]?.id}
    />
);

describe("Song", () => {
    test("Song Image Rendered", () => {
        render(renderSongCard);
        const songImage = screen.getByTestId("song-image");
        expect(songImage).toBeInTheDocument();
    });

    test("Song Title Rendered", () => {
        render(renderSongCard);
        const songTitle = screen.getByTestId("song-title");
        expect(songTitle).toHaveTextContent("Ghost");
    });

    test("Song Artist Rendered", () => {
        render(renderSongCard);
        const songArtist= screen.getByTestId("song-artist");
        expect(songArtist).toHaveTextContent("- Justin Bieber -");
    });

    test("Song Album Rendered", () => {
        render(renderSongCard);
        const songAlbum = screen.getByTestId("song-album");
        expect(songAlbum).toHaveTextContent("Album: Justice");
    });

    test("Song Button Rendered", () => {
        render(renderSongCard);
        const songButton = screen.getByTestId("song-button");
        expect(songButton).toHaveTextContent("Deselect");
    });
});