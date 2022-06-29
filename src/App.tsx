import { useEffect, useRef, useState } from 'react';
import './App.css';
import { Button, Container, Input, TextField, Typography } from '@mui/material';
import mermaid from 'mermaid';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  from: string;
  target: string;
};

const graphText = ({ from, target }: { from: string; target: string }) => {
  return `
    ${graphDiagram} \n
    ${from} ${to} ${target} \n
    ${target}${arrow}C[forbidden] \n
    ${target}${arrow}D[fa:fa-spinner] \n
    ;
  `;
};

const to = '---';
const arrow = '-->';
const graphDiagram = 'graph LR';

const Mermaid = (group: Inputs) => {
  return `<div class="mermaid">${graphText(group)}</div>`;
};

function App() {
  const [target, setTarget] = useState({ from: 'Hoge', target: 'Fuga' });
  const mermaidElm = useRef<HTMLDivElement>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => setTarget(data);

  useEffect(() => {
    const elm = mermaidElm.current;
    if (!elm) return;
    elm.innerHTML = Mermaid(target);
    mermaid.init('.mermaid');
  }, [target]);

  const outputs = graphText(target).split('\n');

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
