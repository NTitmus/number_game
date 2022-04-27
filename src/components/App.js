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
    const numButtons = numbers.length;

    //Add to total when button pressed
    const addToTotal = (n) => {
        console.log('from app', n.target.value)
        setTotal(total+Number(n.target.value))
        
    }

    const player2TurnFunc = () => {
        //const looper = (a) =>{
        //    if (a<total){
        //        return a+(numButtons+1);
        //    }
        //    return looper(a-(numButtons+1))
        //}
        //const x = looper(target)
        //console.log('x is', x)

        const floorDivisionResult = Math.floor((target-total)/(numButtons+1));
        console.log('fd', floorDivisionResult)
        const x = target-(floorDivisionResult*(numButtons+1));
        if (x>total){
            console.log('x is', x)
            setTotal(x);
        } else {
            console.log('****')
            setTotal(total+1);

        }
        
    }

    //Check if person has won
    useEffect(()=>{
        if(total===target){
            setWin(true);
        }
        if(total===0||total===target){return}

        if(player1Turn){
            const timerId = setTimeout(()=>player2TurnFunc(), 2000);
            setPlayer1Turn(!player1Turn);
            return () => clearTimeout(timerId)
        }

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
        </div>
    );

}

export default App