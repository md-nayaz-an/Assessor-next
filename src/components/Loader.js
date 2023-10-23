import React from 'react'

const Loader = ({ layout }) => {
    return (    
        <div className={ 'w-full flex justify-center items-center ' + (layout ? 'h-full' : 'min-h-[70vh]')}>
            <span className="loading loading-spinner text-accent loading-lg" />
        </div>
    )
}

export default Loader