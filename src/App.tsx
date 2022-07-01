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
import { Box } from '@mui/system';

type FormValues = {
  groups: {
    from: string;
    target: string;
    toOrArrow: string;
    withText: string;
  }[];
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
const arrowWithText = (text: string): string => {
  return `-- ${text} -->`;
};

const Group = ({ from, toOrArrow, target }: GroupElm) => {
  return `
  ${from} ${toOrArrow} ${target} ${newLine}
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

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const groups = data.groups.map((group) => {
      if (group.withText) {
        group.toOrArrow = arrowWithText(group.withText);
      }
      return group;
    });
    console.log(groups);
    setGroups(groups);
  };

  useEffect(() => {
    const elm = mermaidElm.current;
    if (!elm) return;
    elm.innerHTML = Mermaid(groups);
    mermaid.init('.mermaid');
  }, [groups]);

  const outputs = graphText(groups).split('\n');

  return (
    <Container fixed sx={{ textAlign: 'center' }}>
      <Typography variant="h2" component="h1">
        Welcome to <span style={{ fontWeight: 'bold' }}>Flounder!</span>
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <section key={field.id}>
                <Controller
                  name={`groups.${index}.from`}
                  control={control}
                  defaultValue={field.from}
                  render={({ field }) => <TextField {...field} />}
                />
                <Controller
                  name={`groups.${index}.toOrArrow`}
                  control={control}
                  render={({ field }) => (
                    <Select {...field} value={to}>
                      <MenuItem value={to}>To</MenuItem>
                      <MenuItem value={arrow}>Arrow</MenuItem>
                    </Select>
                  )}
                />
                <Controller
                  name={`groups.${index}.withText`}
                  control={control}
                  defaultValue={field.withText}
                  render={({ field }) => <TextField {...field} />}
                />
                <Controller
                  name={`groups.${index}.target`}
                  control={control}
                  defaultValue={field.target}
                  render={({ field }) => <TextField {...field} />}
                />
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => remove(index)}
                >
                  DELETE
                </Button>
              </section>
            </div>
          );
        })}

        <Box sx={{ marginTop: '3vh' }}>
          <Button
            type="button"
            variant="outlined"
            sx={{ paddingX: '1.5rem', marginX: '1rem' }}
            onClick={() =>
              append({
                from: 'Hoge',
                toOrArrow: to,
                target: 'Fuga',
              })
            }
          >
            ADD
          </Button>

          <Button
            type="submit"
            variant="contained"
            sx={{ paddingX: '1.5rem', marginX: '1rem' }}
          >
            Submit
          </Button>
        </Box>
      </form>

      <Box
        sx={{
          marginTop: '3vh',
          paddingY: '3vh',
          border: 2,
          borderColor: 'gray',
          borderRadius: '16px',
        }}
      >
        <Typography variant="h3">Mermaid</Typography>
        <div ref={mermaidElm}></div>
      </Box>

      <Box
        sx={{
          marginTop: '3vh',
          paddingY: '3vh',
          border: 2,
          borderColor: 'gray',
          borderRadius: '16px',
        }}
      >
        <Typography variant="h3">Code</Typography>
        <Box>
          {outputs.map((output, index) => (
            <h5 key={index}>{output}</h5>
          ))}
        </Box>
      </Box>
    </Container>
  );
}

export default App;
