import React, { useState, useRef } from 'react';
import "./styles/app.scss";
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import data from "./data";

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

    const timeUpdateHandler = (e) => {
        const current = e.target.currentTime;
        const duration = e.target.duration
        setSongInfo({...songInfo, currentTime: current, duration: duration});
    };

  return (
    <div className="App">
          <Song currentSong={currentSong} />
          <Player 
          audioRef={audioRef}
          currentSong={currentSong} 
          isPlaying={isPlaying} 
          setIsPlaying={setIsPlaying} 
          setSongInfo={setSongInfo}
          songInfo={songInfo}/>
          <Library 
          audioRef={audioRef} 
          songs={songs} 
          setCurrentSong={setCurrentSong}
          isPlaying={isPlaying}/>
          <audio src={currentSong.audio}
            onTimeUpdate={timeUpdateHandler} 
            onLoadedMetadata={timeUpdateHandler} 
            ref={audioRef} ></audio>
    </div>
  );
}

export default App;
