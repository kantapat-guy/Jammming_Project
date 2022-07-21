import React from 'react'
import './TrackList.css'
import Track from '../Track/Track';

const TrackList = (props) => {
    const tracks = props.tracks || []
    return (
        <div className="TrackList">
            {
                tracks.map(track => {
                    return <Track track={track}
                                key={track.id} 
                                onAdd={props.onAdd}
                                isRemoval={props.isRemoval}
                                onRemove={props.onRemove}
                                />
                })
            }
        </div>
    )
}

export default TrackList;