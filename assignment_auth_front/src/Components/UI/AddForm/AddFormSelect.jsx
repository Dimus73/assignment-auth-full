import React from 'react';

const AddFormSelect = ({item, choiceList, nameInChoiceList, setItem, placeholder}) => {
    return (
        <select className={'form-select form-select-sm'}
            name={'select'}
            value={item}
            onChange = {(e) => {
                setItem(e.target.value)
            }} >
            <option value="" disabled selected >select</option>
            {choiceList.map ( ( value,i ) =>
                <option key={i} value={value.id} >{value[nameInChoiceList]}</option>)}
        </select>
    );
};
export default AddFormSelect;