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

    const [buttonList, setButtonList] = useState(numbers);

    //Add to total when button pressed
    const addToTotal = (n) => {
        
        setTotal(total+Number(n.target.value))
        
    }

    const resetGame = () => {
        setPlayer1Turn(true);
        setTotal(0);
        setWin(false);
    }
    const player2TurnFunc = () => {
        
        const count_buttonList = buttonList.length
        const floorDivisionResult = Math.floor((target-total)/(count_buttonList+1));
        
        const x = target-(floorDivisionResult*(count_buttonList+1));
        
        if (x>total){
            setTotal(x);
        } else {
            setTotal(total+1);

        }
        
    }

    //Check if person has won
    useEffect(()=>{
        
        
        if(Number(total)===Number(target)){
            
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

    const showPlayer = player1Turn ? <h3 className='ui purple header'>Player 1</h3> : <h3 className='ui green header'>Player 2</h3>
    const showWin = win ? <h3>{showPlayer} WINS!</h3> : null;

    const closeModal = () => {
        setShowModal(false);
    }

    const onFormSubmit = (a, b) => {
        
        const tempList = Array.from(Array(Number(b)).keys());
        const newList= tempList.map((i)=>{return({label:`Number ${Number(i)+1}`, value:(Number(i)+1)})});
    
        setButtonList(newList)
        setTarget(a);
        closeModal();
    }

    
    return (
        <div className='ui container'>
            <div className='ui segment'>
            <h2>Number Game</h2>
            <h3>The target is <div className='ui blue header'>{target}</div></h3>
            {showPlayer}
            <ButtonBar numberList={buttonList} 
            total={total} 
            target={target}
            onButtonPress={(num)=>addToTotal(num)}
            player={player1Turn}/>
            <h1 className='ui blue header'>{total}</h1>
            {showWin}
            <button className='ui button' onClick={()=>resetGame()}>Reset</button>
            <button className='ui blue button' onClick={()=>setShowModal(true)}>Show Modal</button>
            
            <CModal show={showModal} onCloseModal={()=>closeModal()} onFSubmit={(a, b)=>onFormSubmit(a,b)}/>
            </div>
        </div>
    );

}

export default App