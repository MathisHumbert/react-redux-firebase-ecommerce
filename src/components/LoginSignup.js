import { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { auth } from '../firebase.config';
import { closeLoggin, setUser } from '../redux/features/userSlice';

const LoginSignup = () => {
  const dispatch = useDispatch();
  const { isLoginOpen } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [login, setLogin] = useState(true);

  const { name, email, password } = formData;

  const handleWrapper = (e) => {
    if (!e.target.classList.contains('wrapper')) return;
    dispatch(closeLoggin());
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || (!login && !name)) return;

    // LOGIN
    if (login) {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      dispatch(
        setUser({ name: user.displayName, id: user.uid, email: user.email })
      );
    }
    // SIGN UP
    else {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      updateProfile(auth.currentUser, { displayName: name });
      const user = userCredential.user;
      console.log(user);
      dispatch(setUser({ name: name, id: user.uid, email }));
    }

    dispatch(closeLoggin());
  };

  return (
    <Wrapper
      className={isLoginOpen ? 'wrapper open' : ' wrapper'}
      onClick={handleWrapper}
    >
      <form onSubmit={onSubmit}>
        <h3>{login ? 'login' : 'sign up'}</h3>

        {!login && (
          <div className='form-control'>
            <label htmlFor='name'>Name:</label>
            <input
              type='text'
              id='name'
              placeholder='Name'
              value={name}
              onChange={onChange}
            />
          </div>
        )}

        <div className='form-control'>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            placeholder='Email'
            value={email}
            onChange={onChange}
          />
        </div>

        <div className='form-control'>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            placeholder='Password'
            value={password}
            onChange={onChange}
          />
        </div>

        <button type='submit' className='btn'>
          {login ? 'login' : 'sign up'}
        </button>

        <p>
          {login ? 'Not Registered ? ' : 'Already Registered ? '}
          <span onClick={() => setLogin(!login)}>
            {login ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  position: fixed;
  inset: 0;
  z-index: -1;
  opacity: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  padding: 0 2rem;
  cursor: pointer;

  &.open {
    z-index: 5;
    opacity: 1;
  }

  form {
    background: #fff;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 500px;
    width: 100%;
    cursor: initial;
  }

  h3 {
    text-align: center;
  }

  label {
    display: block;
  }

  input {
    width: 100%;
  }

  button {
    margin: 1rem 0;
  }

  input {
    padding: 10px;
  }

  span {
    font-weight: 700;
    cursor: pointer;
  }
`;

export default LoginSignup;
