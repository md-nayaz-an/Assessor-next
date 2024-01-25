import formatTooltipString from '@utils/formatTooltipString';
import React from 'react'
import { useEffect } from 'react';
import { Tooltip } from 'react-tooltip';

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
    useEffect(() => {
      console.log(props.prevResponses);
      console.log(props.responses.response);
    }, [])
    
    return (
        <div className="flex-center">
            <ul className="steps overflow-visible">
                {
                    props.responses.response.map((response, index) => (
                      <li 
                            key={index}
                            className={`step ${
                                getStatusClass(response.status)
                            } ${
                                (index == props.current) ? 'after:border' : ''
                            } step-${index}`}
                      >
                      {
                        (response.status >= 2) &&
                          <Tooltip
                            anchorSelect={`.step-${index}`}
                          >
                            <div className=' flex flex-col text-left'>
                              <h3 className=' text-lg'>{props.prevResponses[index].question}</h3>
                              {
                                props.prevResponses[index].options.map( res => (
                                  <span>{`${res.count} chose '${res.option}'`}</span>
                                ))
                              }
                            </div>
                          </Tooltip>
                      }
                        
                      </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Steps;