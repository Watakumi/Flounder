import { Container, Typography } from '@mui/material';
import { Graph } from './components/Graph';

function App() {
  return (
    <Container fixed sx={{ textAlign: 'center' }}>
      <Typography variant="h2" component="h1">
        Welcome to <span style={{ fontWeight: 'bold' }}>Flounder!</span>
      </Typography>
      <Graph />
    </Container>
  );
}

export default App;
