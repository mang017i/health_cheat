import React from 'react';
import LoginForm from '../../components/Auth/Login';
import './auth.css';

const LoginPage = () => {

  return (
    <div className='container_auth'>
      <LoginForm />
      <div className="auth_background"></div>
      <div className="blur"></div>
    </div>
  );
}

export default LoginPage;
