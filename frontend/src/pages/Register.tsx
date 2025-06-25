import React from 'react';
import { Container } from '@mui/material';
import RegisterForm from '../components/Auth/RegisterForm';

const RegisterPage: React.FC = () => (
  <Container maxWidth="sm">
    <RegisterForm />
  </Container>
);

export default RegisterPage;