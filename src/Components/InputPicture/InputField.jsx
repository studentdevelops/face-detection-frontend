
import React from "react";
import "./InputField.css";


const InputField = ( { onImageSubmit, onInput } ) => {
    return (
        <div className="form">
            <input type="text" className="field" onChange={ onInput }/>
            <button onClick={onImageSubmit} className="button" >Submit</button>
        </div>
    )
}

export default InputField
