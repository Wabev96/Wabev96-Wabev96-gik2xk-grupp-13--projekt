import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Login from './Login';
import Signup from './Signup';
import { useRecoilValue } from 'recoil';
import { authAtom } from '../../atoms/authAtom';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Auth = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState('login');
  const { isAuthenticated } = useRecoilValue(authAtom);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const toggleActive = () => {
    if (active === 'login') {
      setActive('signup');
    } else {
      setActive('login');
    }
  };
  return (
    <Card style={{ maxWidth: '500px' }}>
      <Card.Body>
        {active === 'login' ? <Login /> : <Signup />}
        {active === 'login' && (
          <p>
            Don&apos;t have an account?{' '}
            <span
              style={{ cursor: 'pointer', color: 'blue' }}
              onClick={toggleActive}
            >
              Create
            </span>
          </p>
        )}
        {active === 'signup' && (
          <p>
            Already have an account?{' '}
            <span
              style={{ cursor: 'pointer', color: 'blue' }}
              onClick={toggleActive}
            >
              Login
            </span>
          </p>
        )}
      </Card.Body>
    </Card>
  );
};

export default Auth;
