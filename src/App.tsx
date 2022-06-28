import { useEffect } from 'react';
import './App.css';
import { Container, TextField, Typography } from '@mui/material';
import mermaid from 'mermaid';

function App() {
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
    });
  });

  const example = `
  graph LR
  A --- B
  B-->C[fa:fa-ban forbidden]
  B-->D(fa:fa-spinner)
  `;

  return (
    <Container fixed>
      <Typography variant="h2" component="h1">
        Welcome to <span style={{ fontWeight: 'bold' }}>Flounder!</span>
      </Typography>
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <div className="mermaid">{example}</div>
    </Container>
  );
}

export default App;
