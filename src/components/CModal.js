import React, {useState} from 'react';
import './CModal.css'

const CModal = ({show, onCloseModal, onFSubmit}) => {
    const [selectedTarget, setSelectedTarget] = useState(10);
    const [targetError, setTargetError] = useState('')

    const onFormSubmit = (event) => {
        event.preventDefault();
        const re = new RegExp('^[1-9][0-9]{0,1}$');
        if (re.test(selectedTarget.toString())){
            console.log('if is true')
            onFSubmit(selectedTarget);
        } else {
            console.log('Error in target amount')
            setTargetError('Error - Target should be 1-99')
        }
        
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
                This is modal content
                <form onSubmit={(e)=>onFormSubmit(e)}>
                <div className='field'>
                    <label>Target - should have a range 1-99 inclusive</label>
                    <input className='input'
                    onChange={(e)=>setSelectedTarget(e.target.value)} 
                    value={selectedTarget}/>
                </div>
                </form>
            </div>
            <div className='modal-footer'>
                <button className='button' type='button' onClick={()=>onCloseModal()}>Close</button>
            </div>
            </div>
        </div>
    );
}
export default CModal