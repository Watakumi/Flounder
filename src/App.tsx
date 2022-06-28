import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Container, Typography } from '@mui/material';

function App() {
  return (
    <Container fixed>
      <Typography variant="h2" component="h1">
        Welcome to <span style={{ fontWeight: 'bold' }}>Flounder!</span>
      </Typography>
    </Container>
  );
}

export default App;
