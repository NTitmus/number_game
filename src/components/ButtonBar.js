import React from 'react';
import {useState} from 'react';

const ButtonBar = ({numberList, total, onButtonPress}) => {
    //Too big state
    const [displayError, setDisplayError] = useState(false)
    
    const onButtonClick = (a) => {
        console.log(a.target.value);
        if ((Number(a.target.value)+total)>10) {
            setDisplayError(true);
        } else {
            setDisplayError(false);
            onButtonPress(a);
        }
    } 

    const buttonList = numberList.map((item)=>
    {return(
        <button key={item.label} 
        onClick={(a)=>{onButtonClick(a)}} value={item.value}>
            {item.label}
        </button>
        );});

    

    return(
        <div className='ui segment'>
            {buttonList}
            {displayError?(<div>Error</div>):null}
        </div>
    );
}
export default ButtonBar