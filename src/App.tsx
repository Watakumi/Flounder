import {
  Container,
  List,
  ListItem,
  Link,
  Typography,
  Grid,
  CssBaseline,
} from '@mui/material';
import { Link as RouterLink, Route, Routes } from 'react-router-dom';
import { ClassDiagram } from './components/ClassDiagram';
import { Graph } from './components/Graph';

function App() {
  return (
    <>
      <CssBaseline />
      <Container fixed sx={{ textAlign: 'center' }}>
        <Typography variant="h2" component="h1">
          Welcome to <span style={{ fontWeight: 'bold' }}>Flounder!</span>
        </Typography>

        <Grid container sx={{ fontSize: '24px' }}>
          <Grid item xs={6}>
            <Link to="/" component={RouterLink}>
              Flowchart
            </Link>
          </Grid>

          <Grid item xs={6}>
            <Link to="class" component={RouterLink}>
              ClassDiagram
            </Link>
          </Grid>
        </Grid>

        <Routes>
          <Route path="/" element={<Graph />} />
          <Route path="class" element={<ClassDiagram />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
