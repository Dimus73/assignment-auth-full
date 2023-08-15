import React from 'react';

const InputElement = ({i, value, placeholder, type, element, changeElement, ...props}) => {
    return (
        <div className="form-floating mb-4">
            <input
                value={value}
                type={type}
                className="form-control"
                id={i}
                placeholder="password"
                name={element}
                onChange={(e) => changeElement(e.target.value)}/>
            <label htmlFor="floatingInput">{placeholder}</label>
        </div>    );
};

export default InputElement;