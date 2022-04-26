import React from 'react';
import { useState } from 'react';
import ButtonBar from './ButtonBar';

const App = () => {

    //State - total number
    const [total, setTotal] = useState(0)

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



    return (
        <div>
            <h2>Number Game</h2>
            <ButtonBar numberList={numbers} 
            total={total} 
            onButtonPress={(num)=>addToTotal(num)}/>
            <h1>{total}</h1>
        </div>
    );

}



export default App