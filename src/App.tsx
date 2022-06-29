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
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';

type FormValues = {
  groups: { from: string; target: string; toOrArrow: string }[];
};

const graphText = (groups: GroupElm[]) => {
  const lines = groups.map((group) => Group(group)).join(newLine);
  return `
    ${graphDiagram} \n
    ${lines}
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

const Mermaid = (groups: GroupElm[]) => {
  return `<div class="mermaid">${graphText(groups)}</div>`;
};

function App() {
  const [groups, setGroups] = useState([
    {
      from: 'Hoge',
      target: 'Fuga',
      toOrArrow: to,
    },
  ]);
  const mermaidElm = useRef<HTMLDivElement>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      groups: [{ from: 'Hoge', toOrArrow: to, target: 'Fuga' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'groups',
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => setGroups(data.groups);

  useEffect(() => {
    const elm = mermaidElm.current;
    if (!elm) return;
    elm.innerHTML = Mermaid(groups);
    mermaid.init('.mermaid');
  }, [groups]);

  const outputs = graphText(groups).split('\n');

  return (
    <Container fixed>
      <Typography variant="h2" component="h1">
        Welcome to <span style={{ fontWeight: 'bold' }}>Flounder!</span>
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => {
          console.log(field.id);
          return (
            <div key={field.id}>
              <section key={field.id}>
                <Controller
                  name={`groups.${index}.from`}
                  control={control}
                  defaultValue="Hoge"
                  render={({ field }) => <TextField {...field} />}
                />
                <Controller
                  name={`groups.${index}.toOrArrow`}
                  control={control}
                  render={({ field }) => (
                    <Select {...field}>
                      <MenuItem value={to}>To</MenuItem>
                      <MenuItem value={arrow}>Arrow</MenuItem>
                    </Select>
                  )}
                />
                <Controller
                  name={`groups.${index}.target`}
                  control={control}
                  defaultValue="Fuga"
                  render={({ field }) => <TextField {...field} />}
                />
                <Button type="button" onClick={() => remove(index)}>
                  DELETE
                </Button>
              </section>
            </div>
          );
        })}

        <Button
          type="button"
          onClick={() =>
            append({
              from: '',
              toOrArrow: '',
              target: '',
            })
          }
        >
          ADD
        </Button>

        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
      <div ref={mermaidElm}></div>
      {outputs.map((output, index) => (
        <h5 key={index}>{output}</h5>
      ))}
    </Container>
  );
}

export default App;
