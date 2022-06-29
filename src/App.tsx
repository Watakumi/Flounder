import { useEffect, useRef, useState } from 'react';
import './App.css';
import { Button, Container, Input, TextField, Typography } from '@mui/material';
import mermaid from 'mermaid';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  example: string;
};

const graphText = (target: string) => {
  return `
graph LR \n
A --- ${target} \n
${target}-->C[forbidden] \n
${target}-->D[fa:fa-spinner] \n
;
`;
};

const Mermaid = ({ target }: { target: string }) => {
  return `<div class="mermaid">${graphText(target)}</div>`;
};

function App() {
  const [target, setTarget] = useState('B');
  const mermaidElm = useRef<HTMLDivElement>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => setTarget(data.example);

  useEffect(() => {
    const elm = mermaidElm.current;
    if (!elm) return;
    elm.innerHTML = Mermaid({ target: target });
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
          name="example"
          control={control}
          defaultValue=""
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
