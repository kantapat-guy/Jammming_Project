const clientID = "71e4c632e6fe421bb67045714448cae7"
const redirectURI = "https://cozy-crisp-368f49.netlify.app/"
let accessToken = undefined
let expiresIn = undefined

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken
        } 

        const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresMatch = window.location.href.match(/expires_in=([^&]*)/);
        if (tokenMatch && expiresMatch) {
            accessToken = tokenMatch[1];
            expiresIn = expiresMatch[1];

            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
        } else {
            const URL = `https://accounts.spotify.com/authorize?response_type=token&scope=playlist-modify-public&client_id=${clientID}&redirect_uri=${redirectURI}`;
            window.location = URL;
        }
    },

    async search (term) {
        const replaceEmptySpace = term.replace(" ", "%20");
        const searchUrl = `https://api.spotify.com/v1/search?type=track&q=${replaceEmptySpace}`;
        const response = await fetch(searchUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        const jsonResponse = await response.json()
        if (!jsonResponse.tracks)
            return []
        return jsonResponse.tracks.items.map((track) => {
            return {
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri,
            };
        });
    },

    async savePlaylist(name, trackIds) {
        if (Array.isArray(trackIds) && trackIds.length) {
          const createPlaylistUrl = `https://api.spotify.com/v1/me/playlists`;
          const response = await fetch(createPlaylistUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              name: name,
              public: true,
            }),
          });
          const jsonResponse = await response.json();
          const playlistId = jsonResponse.id;
          if (playlistId) {
            const replacePlaylistTracksUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
            await fetch(replacePlaylistTracksUrl, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
              body: JSON.stringify({
                uris: trackIds
              }),
            });
          }
        }
    },
};




export default Spotify;