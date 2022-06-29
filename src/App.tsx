import { useEffect, useRef, useState } from 'react';
import './App.css';
import {
  Button,
  Container,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import mermaid from 'mermaid';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  from: string;
  target: string;
  toOrArrow: string;
};

const graphText = (groupElm: GroupElm) => {
  return `
    ${graphDiagram} \n
    ${Group(groupElm)}
    ;
  `;
};

const to = '---';
const arrow = '-->';
const graphDiagram = 'graph LR';
const newLine = ' \n';

const Group = ({ from, toOrArrow, target }: GroupElm) => {
  return `
  ${from} ${toOrArrow} ${target} \n
  `;
};

type GroupElm = {
  from: string;
  toOrArrow: string;
  target: string;
};

const Mermaid = (group: Inputs) => {
  return `<div class="mermaid">${graphText(group)}</div>`;
};

function App() {
  const [group, setGroup] = useState({
    from: 'Hoge',
    target: 'Fuga',
    toOrArrow: to,
  });
  const mermaidElm = useRef<HTMLDivElement>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => setGroup(data);

  useEffect(() => {
    const elm = mermaidElm.current;
    if (!elm) return;
    elm.innerHTML = Mermaid(group);
    mermaid.init('.mermaid');
  }, [group]);

  const outputs = graphText(group).split('\n');

  return (
    <Container fixed>
      <Typography variant="h2" component="h1">
        Welcome to <span style={{ fontWeight: 'bold' }}>Flounder!</span>
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="from"
          control={control}
          defaultValue="Hoge"
          render={({ field }) => <TextField {...field} />}
        />
        <Controller
          name="toOrArrow"
          control={control}
          render={({ field }) => (
            <Select {...field}>
              <MenuItem value={to}>To</MenuItem>
              <MenuItem value={arrow}>Arrow</MenuItem>
            </Select>
          )}
        />
        <Controller
          name="target"
          control={control}
          defaultValue="Fuga"
          render={({ field }) => <TextField {...field} />}
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
      <div ref={mermaidElm}></div>
      {outputs.map((output) => (
        <h5>{output}</h5>
      ))}
    </Container>
  );
}

export default App;
