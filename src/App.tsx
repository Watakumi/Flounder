import { Container, List, ListItem, Typography } from '@mui/material';
import { Link, Route, Routes } from 'react-router-dom';
import { ClassDiagram } from './components/ClassDiagram';
import { Graph } from './components/Graph';

function App() {
  return (
    <Container fixed sx={{ textAlign: 'center' }}>
      <Typography variant="h2" component="h1">
        Welcome to <span style={{ fontWeight: 'bold' }}>Flounder!</span>
      </Typography>

      <List>
        <ListItem>
          <Link to="/">Flowchart</Link>
        </ListItem>
        <ListItem>
          <Link to="/class">ClassDiagram</Link>
        </ListItem>
      </List>

      <Routes>
        <Route path="/" element={<Graph />} />
        <Route path="class" element={<ClassDiagram />} />
      </Routes>
    </Container>
  );
}

export default App;
