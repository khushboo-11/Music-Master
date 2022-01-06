import React, { Component } from "react";
import Artist from "./Artist";
import Tracks from "./Tracks";
import Search from "./Search";
class App extends Component {
  state = {
    artist: null,
    tracks: [],
    related: [],
  };

  searchArtist = (artistQuery) => {
    console.log("this.state", this.state);
    const BASE_URL = "https://api.spotify.com/v1/search?";
    let FETCH_URL = BASE_URL + "q=" + artistQuery + "&type=artist&limit=1";
    const ALBUM_URL = "https://api.spotify.com/v1/artists/";
    let accessToken = "Your Access Token";

    var myOptions = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
      mode: "cors",
      cache: "default",
    };

    fetch(FETCH_URL, myOptions)
      .then((response) => response.json())
      .then((json) => {
        const artist = json.artists.items[0];
        console.log("artist", artist);
        this.setState({ artist });

        FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`;
        fetch(FETCH_URL, myOptions)
          .then((response) => response.json())
          .then((json) => {
            const { tracks } = json;
            console.log("tracks", tracks);
            this.setState({ tracks });
          })
          .catch((error) => alert(error.message));
      });
  };

  render() {
    return (
      <div>
        <h2>Music Master</h2>
        <Search searchArtist={this.searchArtist} />
        <Artist artist={this.state.artist} />
        <Tracks tracks={this.state.tracks} />
      </div>
    );
  }
}

export default App;
