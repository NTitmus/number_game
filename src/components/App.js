import React from 'react';
import { useState, useEffect } from 'react';
import ButtonBar from './ButtonBar';
import CModal from './CModal';


const App = () => {

    //State - total number
    const [total, setTotal] = useState(0);
    const [win, setWin] = useState(false);
    const [player1Turn, setPlayer1Turn] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [target, setTarget] = useState(10);

    //Target number
    

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
        
        const x = target-(floorDivisionResult*(numButtons+1));
        if (x>total){
            setTotal(x);
        } else {
            setTotal(total+1);

        }
        
    }

    //Check if person has won
    useEffect(()=>{
        console.log('target is', target)
        console.log('player ', player1Turn)
        console.log('total', total)
        console.log('=', (Number(total)===Number(target)))
        
        if(Number(total)===Number(target)){
            console.log('win!')
            setWin(true);
            return;
        }
        if(total===0){return}

        if(player1Turn){
            const timerId = setTimeout(()=>player2TurnFunc(), 2000);
            setPlayer1Turn(!player1Turn);
            return () => {console.log('clearing timer');clearTimeout(timerId)}
        }

        setPlayer1Turn(!player1Turn);
        
    },[total, target])

    const showPlayer = player1Turn ? <h3 style={{color:'orange'}}>Player 1</h3> : <h3 style={{color:'blue'}}>Player 2</h3>
    const showWin = win ? <div style={{color:'red'}}>{showPlayer} WINS!</div> : null;

    const closeModal = () => {
        setShowModal(false);
    }

    const onFormSubmit = (a) => {
        console.log('%%%',a);
        setTarget(a);
        closeModal();
    }

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
            <button onClick={()=>setShowModal(true)}>Show Modal</button>
            <CModal show={showModal} onCloseModal={()=>closeModal()} onFSubmit={(a)=>onFormSubmit(a)}/>
            
        </div>
    );

}

export default App