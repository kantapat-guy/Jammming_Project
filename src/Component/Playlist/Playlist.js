import React from 'react'
import './Playlist.css'
import TrackList from '../TrackList/TrackList'

const Playlist = (props) => {

    const handleNameChange = (event) => {
        const change = event.target.value
        props.onNameChange(change)
    }

    return (
        <div className="Playlist">
            <input defaultValue={"My Playlist"}
                    onChange={handleNameChange}
                    />
            <TrackList tracks={props.playlistTracks}
                        onRemove={props.onRemove}
                        isRemoval={true}
                        />
        <button className="Playlist-save" onClick={props.onSave} >SAVE TO SPOTIFY</button>
        </div>
    )
}

export default Playlist;