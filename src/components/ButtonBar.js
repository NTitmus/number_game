import React from 'react';
import {useState} from 'react';

const ButtonBar = ({numberList, total, onButtonPress, target, player}) => {
    //Too big state
    const [displayError, setDisplayError] = useState('')
    
    const onButtonClick = (a) => {
        //console.log('player', player)
        //console.log(a.target.value);
        if ((Number(a.target.value)+total)>target) {
            setDisplayError('Goes above target');
        } 
        else {
            setDisplayError('');
            onButtonPress(a);
        }
    } 

    const buttonList = numberList.map((item)=>
    {return(
        <button className='ui orange button'
        key={item.label} 
        onClick={(a)=>{onButtonClick(a)}} 
        value={item.value}
        disabled={!player}>
            {item.value}
        </button>
        );});

    

    return(
        <div className='ui segment'>
            {buttonList}
            {displayError!=''?(<div><h3 className='ui blue header'>Error - {displayError}</h3></div>):null}
        </div>
    );
}
export default ButtonBar