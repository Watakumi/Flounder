import { useEffect, useRef, useState } from 'react';

import {
  Button,
  FormControl,
  Grid,
  InputLabel,
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
import { FormValues } from './types';
import { Code } from './component';
import { code, mermaidHTML } from './utils';

const to = '---';
const arrow = '-->';
const arrowWithText = (text: string): string => {
  return `-- ${text} -->`;
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
    setGroups(groups);
  };

  useEffect(() => {
    const elm = mermaidElm.current;
    if (!elm) return;
    elm.innerHTML = mermaidHTML(code(groups));
    mermaid.init('.mermaid');
  }, [groups]);

  const outputs = code(groups).split('\n');

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
                    <Grid
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      spacing={2}
                    >
                      <Grid item>
                        <FormControl sx={{ minWidth: 110 }}>
                          <InputLabel id="relation-label">Relation</InputLabel>
                          <Controller
                            name={`groups.${index}.toOrArrow`}
                            control={control}
                            render={({ field }) => (
                              <Select
                                {...field}
                                labelId="relation-label"
                                label="Relation"
                              >
                                <MenuItem value={to}>To</MenuItem>
                                <MenuItem value={arrow}>Arrow</MenuItem>
                              </Select>
                            )}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="h5"
                          sx={{ display: 'inline-block' }}
                        >
                          with
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Controller
                          name={`groups.${index}.withText`}
                          control={control}
                          defaultValue={field.withText}
                          render={({ field }) => (
                            <TextField {...field} label="Comment" />
                          )}
                        />
                      </Grid>
                    </Grid>
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

      <Code outputs={outputs} />
    </>
  );
}
