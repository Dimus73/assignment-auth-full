import React from 'react';

const AddFormInput = ({item, setItem, placeholder}) => {
    return (
        <input className='form-control' onChange={(e) => setItem (e.target.value) }
               type="text" name='equipment'  value = {item} placeholder={placeholder}/>
    );
};

export default AddFormInput;