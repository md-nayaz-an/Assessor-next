import React, { useEffect, useState } from 'react';

const AlertToast = ({ children, duration, type }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timeout = setTimeout(() => {
        setVisible(false);
      }, duration);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [duration]);

  const toastClass = `toast ${visible ? 'block' : 'hidden'} ${
    type === 'info'
      ? 'alert alert-info'
      : type === 'success'
      ? 'alert alert-success'
      : type === 'warning'
      ? 'alert alert-warning'
      : type === 'error'
      ? 'alert alert-error'
      : ''
  }`;

  return (
    <div className={toastClass}>
      <div>
        <span>{children}</span>
      </div>
    </div>
  );
};

export default AlertToast;
