import { Container, Typography } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { Graph } from './components/Graph';

function App() {
  return (
    <Container fixed sx={{ textAlign: 'center' }}>
      <Typography variant="h2" component="h1">
        Welcome to <span style={{ fontWeight: 'bold' }}>Flounder!</span>
      </Typography>

      <Routes>
        <Route path="/" element={<Graph />} />
        <Route path="hoge" element={<div>hoge</div>} />
      </Routes>
    </Container>
  );
}

export default App;
