import React from 'react';
import RegisterForm from '../../components/Auth/Register';
import './auth.css';

const RegisterPage = () => {

  return (
    <div className='container_auth register'>
      <RegisterForm />
      <div className="auth_background"></div>
      <div className="blur"></div>
    </div>
  );
}

export default RegisterPage;
