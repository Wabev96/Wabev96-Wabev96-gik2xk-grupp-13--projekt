import { useForm } from 'react-hook-form';
import { useSignup } from './useSignup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isPending } = useSignup();
  const onSubmitHandler = (data) => {
    signup(data);
  };
  return (
    <>
      <h1 style={{ marginBottom: '10px' }}>Signup</h1>
      <Form onSubmit={handleSubmit(onSubmitHandler)}>
        <Form.Group style={{ marginBottom: '20px' }} as={Col} md='12'>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='First name'
            {...register('firstName', {
              required: 'firstName is required',
            })}
          />

          {errors?.firstName?.message && (
            <span>{errors?.firstName?.message}</span>
          )}
        </Form.Group>
        <Form.Group style={{ marginBottom: '20px' }} as={Col} md='12'>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Last name'
            {...register('lastName', {
              required: 'lastName is required',
            })}
          />

          {errors?.lastName?.message && (
            <span>{errors?.lastName?.message}</span>
          )}
        </Form.Group>
        <Form.Group style={{ marginBottom: '20px' }} as={Col} md='12'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='Email'
            {...register('email', {
              required: 'email is required',
            })}
          />

          {errors?.email?.message && <span>{errors?.email?.message}</span>}
        </Form.Group>
        <Form.Group style={{ marginBottom: '20px' }} as={Col} md='12'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='text'
            placeholder='Password'
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

export default Signup;
