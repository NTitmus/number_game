import React, {useState} from 'react';
import './CModal.css'

const CModal = ({show, onCloseModal, onFSubmit}) => {
    const [selectedTarget, setSelectedTarget] = useState(10);
    const [targetError, setTargetError] = useState('')
    const [sliderValue, setSliderValue] = useState(3);

    const onFormSubmit = (event) => {
        event.preventDefault();
        console.log(event.target)
        //The first digit must be 1-9, but any subsequent digits can be 0-9.
        //Currently set to 1 additional digit (ie up to 2 digit number)
        const re = new RegExp('^[1-9][0-9]{0,1}$');
        
        if (re.test(selectedTarget.toString())){
            setTargetError('');
            console.log('if is true')
            onFSubmit(selectedTarget, sliderValue);
        } else {
            console.log('Error in target amount')
            setTargetError('Error - Target should be 1-99')
        }
        
    }

    const onChangeField = (e) => {
        setTargetError('');
        setSelectedTarget(e.target.value);
    }

    const onChangeSlider = (e) => {
        setSliderValue(e.target.value);
    }


    if (!show) {
        return null
    }

    return(
        <div className='modal'>
            <div className='modal-content'>
            <div className='modal-header'>
            <h1>In the modal</h1>
            </div>
            <div className='modal-body'>
                Modal Content
                <form onSubmit={(e)=>onFormSubmit(e)}>
                <div className='field'>
                    <label>Target - should have a range 1-99 inclusive</label>
                    <br/>
                    <input className='input'
                    onChange={(e)=>onChangeField(e)} 
                    value={selectedTarget}/>
                    <br/>
                    <input 
                    type='range'
                    min='1'
                    max='10'
                    value={sliderValue}
                    onChange={(e)=>onChangeSlider(e)}
                    />
                    <br/>
                    <label className='error-msg'>{targetError}</label>
                </div>
                </form>
            </div>
            <div className='modal-footer'>
                <button className='button' type='button' onClick={()=>onCloseModal()}>Back</button>
            </div>
            </div>
        </div>
    );
}
export default CModal