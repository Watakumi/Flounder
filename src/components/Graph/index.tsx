import { useEffect, useRef, useState } from 'react';

import {
  Button,
  Container,
  Grid,
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

export function Graph() {
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
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => {
          return (
            <div key={field.id} style={{ margin: '16px' }}>
              <section key={field.id}>
                <Grid
                  container
                  sx={{ justifyContent: 'center', alignItems: 'center' }}
                >
                  <Grid item xs={3}>
                    <Controller
                      name={`groups.${index}.from`}
                      control={control}
                      defaultValue={field.from}
                      render={({ field }) => (
                        <TextField {...field} label="From" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <Box sx={{ flexDirection: 'row' }}>
                      <Controller
                        name={`groups.${index}.toOrArrow`}
                        control={control}
                        render={({ field }) => (
                          <Select {...field} sx={{ mx: 4 }} label="Relation">
                            <MenuItem value={to}>To</MenuItem>
                            <MenuItem value={arrow}>Arrow</MenuItem>
                          </Select>
                        )}
                      />
                      <Typography variant="h5" sx={{ display: 'inline-block' }}>
                        with
                      </Typography>
                      <Controller
                        name={`groups.${index}.withText`}
                        control={control}
                        defaultValue={field.withText}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            sx={{ mx: 4 }}
                            label="Comment"
                          />
                        )}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Controller
                      name={`groups.${index}.target`}
                      control={control}
                      defaultValue={field.target}
                      render={({ field }) => (
                        <TextField {...field} label="Target" />
                      )}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      type="button"
                      variant="outlined"
                      onClick={() => remove(index)}
                    >
                      DELETE
                    </Button>
                  </Grid>
                </Grid>
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
    </>
  );
}
