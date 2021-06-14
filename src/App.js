import React, { useState, useRef } from 'react';
import "./styles/app.scss";
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import data from "./data";
import Nav from './components/Nav';

function App() {
  //ref
  const audioRef = useRef(null);

  //state
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
    });
    const [libraryStatus, setLibraryStatus] = useState(false);


    const timeUpdateHandler = (e) => {
        const current = e.target.currentTime;
        const duration = e.target.duration
        setSongInfo({...songInfo, currentTime: current, duration: duration});
    };

  return (
    <div className="App">
          <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
          <Song currentSong={currentSong} />
          <Player 
          audioRef={audioRef}
          currentSong={currentSong} 
          isPlaying={isPlaying} 
          setIsPlaying={setIsPlaying} 
          setSongInfo={setSongInfo}
          songInfo={songInfo}
          songs={songs}
          setCurrentSong={setCurrentSong}/>
          <Library 
          audioRef={audioRef} 
          songs={songs} 
          setCurrentSong={setCurrentSong}
          isPlaying={isPlaying}
          setSongs={setSongs}
          libraryStatus={libraryStatus}/>
          <audio src={currentSong.audio}
            onTimeUpdate={timeUpdateHandler} 
            onLoadedMetadata={timeUpdateHandler} 
            ref={audioRef} ></audio>
    </div>
  );
}

export default App;
