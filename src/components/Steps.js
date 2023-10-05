import React from 'react'

function getStatusClass(status) {
    switch (status) {
      case 1:
        return 'step-neutral';
      case 2:
        return 'step-accent';
      case 3:
        return 'step-error';
      case 4:
        return 'step-warning';
      default:
        return '';
    }
  }

const Steps = (props) => {
    return (
        <div className="overflow-x-auto flex-center">
            <ul className="steps">
                {
                    props.responses.response.map((response, index) => (
                        <li 
                            key={index}
                            className={`step ${
                                getStatusClass(response.status)
                            } ${
                                (index == props.current) ? 'after:border' : ''
                            }`}
                        />
                    ))
                }
            </ul>
        </div>
    )
}

export default Steps;