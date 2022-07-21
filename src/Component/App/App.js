import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import { useEffect, useState } from 'react';
import Spotify from '../Util/Spotify';

function App() {


  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState('My Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);


  const addTrack = (track) => {
    if (playlistTracks.find(savedTrack => savedTrack.id === playlistTracks.id)) {
      return;
    }
    setPlaylistTracks([...playlistTracks, track])
  }

  const removeTrack = (track) => {
    setPlaylistTracks(playlistTracks.filter((oldTracks) => oldTracks.id !== track.id))
  }

  const updatePlaylistName = (name) => {
    setPlaylistName(name)
  }

  const savePlaylist = async () => {
    const trackURIs = playlistTracks.map(track => track.uri);
    await Spotify.savePlaylist(playlistName, trackURIs)

    setPlaylistName('My Playlist');
    setPlaylistTracks([]);
  }

  const search = async (term) => {
    const spotifySearch = await Spotify.search(term);
    setSearchResults(spotifySearch)
  }

  useEffect (() => {
    Spotify.getAccessToken()
  }, [])

  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          <SearchResults searchResults={searchResults}
                          onAdd={addTrack}
                          />
          <Playlist playlistName={playlistName} 
                    playlistTracks={playlistTracks}
                    onRemove={removeTrack}
                    onNameChange={updatePlaylistName}
                    onSave={savePlaylist}
                    />
        </div>
      </div>
    </div>
  );
}

export default App;
