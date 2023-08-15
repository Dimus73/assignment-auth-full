import React from 'react';
import cssClass from './TableSection.module.css'
const TableSection = ({children, ...props}) => {
    return (
        <div {...props} className='row justify-content-md-center'>
            <div className=' col-12 col-lg-8 mt-3 p-3' >
                <div className={cssClass.scroll_div}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default TableSection;