import React from 'react';
import { useForm } from 'react-hook-form';
import { useLogin } from './useLogin';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();
  const { login, isPending } = useLogin();
  const onSubmitHandler = (data) => {
    login(data);
  };
  return (
    <>
      <h2>Login</h2>
      <Form validated={isValid} onSubmit={handleSubmit(onSubmitHandler)}>
        <Form.Group
          style={{ marginBottom: '20px' }}
          as={Col}
          md='12'
          controlId='validationCustom01'
        >
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='First name'
            {...register('email', {
              required: 'Email is required',
            })}
          />

          {errors?.email?.message && <span>{errors?.email?.message}</span>}
        </Form.Group>
        <Form.Group
          style={{ marginBottom: '20px' }}
          as={Col}
          md='12'
          controlId='validationCustom01'
        >
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='password'
            {...register('password', {
              required: 'password is required',
            })}
          />

          {errors?.password?.message && (
            <span>{errors?.password?.message}</span>
          )}
        </Form.Group>

        <Button disabled={isPending} type='submit' md='12' variant='primary'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default Login;
