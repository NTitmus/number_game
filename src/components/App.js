import React from 'react';
import { useState, useEffect } from 'react';
import ButtonBar from './ButtonBar';

const App = () => {

    //State - total number
    const [total, setTotal] = useState(0);
    const [win, setWin] = useState(false);
    const [player1Turn, setPlayer1Turn] = useState(true)

    //Target number
    const target = 10;

    //Array of possible buttons to pass into ButtonBar
    const numbers = [
        {label: 'Number 1',
        value: 1},
        {label: 'Number 2',
        value: 2},
        {label:'Number 3',
        value: 3}

    ]

    //Add to total when button pressed
    const addToTotal = (n) => {
        console.log('from app', n.target.value)
        setTotal(total+Number(n.target.value))
        
    }

    const resetGame = () => {
        setPlayer1Turn(true);
        setTotal(0);
    }

    //Check if person has won
    useEffect(()=>{
        if(total===target){
            setWin(true);
        }
        if(total===0||total===target){return}
        setPlayer1Turn(!player1Turn);
        
    },[total])

    const showPlayer = player1Turn ? <h3 style={{color:'orange'}}>Player 1</h3> : <h3 style={{color:'blue'}}>Player 2</h3>
    const showWin = win ? <div style={{color:'red'}}>{showPlayer} WINS!</div> : null;

    

    return (
        <div>
            <h2>Number Game</h2>
            <p>{`The target is ${target}`}</p>
            {showPlayer}
            <ButtonBar numberList={numbers} 
            total={total} 
            target={target}
            onButtonPress={(num)=>addToTotal(num)}/>
            <h1>{total}</h1>
            {showWin}
            <button onClick={()=>resetGame()}>Reset</button>
        </div>
    );

}

export default App