import React, { useState } from 'react';
import './App.css';
import Lobby from './App/lobby';
import {SCREEN} from './App/constants';
import Game from './App/game';
import UpGrades from './App/upgrades';
import GameOver from './App/gameOver';




function App() {

  const [screen, setScreen] = useState(SCREEN.LOBBY);
  const [score, setScore] = useState(0);
  const [userName, setUsername] = useState('');

  return (
    <div style={ {display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'row'} }  >
    
     {screen === SCREEN.LOBBY ? (
    
    <Lobby userName={userName} setScreen={setScreen} setUsername={setUsername}/>
     ): (
       screen === SCREEN. UPGRADES ? <UpGrades setScreen={setScreen}/> 
     :( 
       screen === SCREEN.GAME_OVER ? <GameOver setScreen={setScreen} score={score}/>
      :(
        <Game userName={userName} setScreen={setScreen} setScore={setScore}/>
      )))}
    </div>
    );
}

export default App;
