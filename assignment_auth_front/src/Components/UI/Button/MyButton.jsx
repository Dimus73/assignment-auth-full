import React from 'react';

const MyButton = ({children, onClickAction,...props}) => {
    return (
        <div {...props}>
            <button className="btn btn-outline-danger"
                    onClick={(e)=>{ e.preventDefault(); onClickAction()}}>
                {children}
            </button>
        </div>
    );
};

export default MyButton;