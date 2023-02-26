import React from 'react';
import ResetForm from '../../components/Auth/Reset';
import './auth.css';

const ResetPassword = () => {
  return (
    <div className='container_auth'>
      <ResetForm />
      <div className="auth_background"></div>
      <div className="blur"></div>
    </div>
  );
}

export default ResetPassword;
