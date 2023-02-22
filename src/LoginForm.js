import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('https://example.com/api/login', { email, password })
      .then((response) => {
        if (response.data.success) {
          Swal.fire({
            icon: 'success',
            title: 'Login successful!',
            text: 'Redirecting to dashboard...',
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Login failed',
            text: response.data.message
          });
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'An error occurred',
          text: 'Please try again later'
        });
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={handleEmailChange} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={handlePasswordChange} />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
