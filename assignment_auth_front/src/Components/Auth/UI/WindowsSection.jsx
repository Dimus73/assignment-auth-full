import React from 'react';

const WindowsSection = ({children, title, action, buttonName, ...props}) => {
    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-4 bg-white p-0'>
                    <div className='m-3' style={{backgroundColor: '#FDEDDA'}}>
                        <main className="form-signin w-100 m-auto">
                            <form className='form-signin' action="" onSubmit={action}>
                                <div className='row jd-flex align-items-center justify-content-center'>
                                    <h3 className={'text-center pb-5'}>{title}</h3>
                                </div>
                                    {children}
                                <button className="btn btn-danger w-100 py-2" type="submit">{buttonName}</button>
                            </form>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WindowsSection;