import {
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import {
  Control,
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
  useWatch,
} from 'react-hook-form';
import { FormValues } from './types';
import { Attributes, Klass, Relations } from './components';
import { relationships } from './utils';
import CopyToClipboard from 'react-copy-to-clipboard';

type Klass = {
  name: string;
  relations: { type: string; target: string }[];
  attributes: string[];
};

export const code = (classes: Klass[]) => {
  const classesBlock = classes.map((klass) =>
    classBlock(klass.name, klass.attributes)
  );
  const relationBlocks = classes.map((klass) =>
    relationBlock(klass.name, klass.relations)
  );
  return `classDiagram
${relationBlocks.join('\n')}
${classesBlock.join('\n')}`;
};

const classBlock = (name: string, attributes: string[]) => {
  return `class ${name} {\n${attributes.join('\n')}\n}`;
};

const startText = '```mermaid \n';
const endText = '\n ```';

const relationBlock = (
  from: string,
  relations: { type: string; target: string }[]
) => {
  return relations
    .map((relation) => `${from} ${relation.type} ${relation.target}`)
    .join('\n');
};

export function ClassDiagram() {
  const mermaidElm = useRef<HTMLDivElement>(null);
  const [klass, setKlass] = useState([
    {
      name: 'Hoge',
      relations: [{ type: relationships.inheritence[0], target: 'hoge' }],
      attributes: ['fuga', 'piyo'],
    },
  ]);

  const outputs = code(klass).split('\n');
  const rowCode = `${startText}${outputs.join('\n')}${endText}`;

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      class: [
        {
          name: 'Hoge',
          relations: [{ type: relationships.inheritence[0], target: 'gege' }],
          attributes: [{ name: 'hoge' }, { name: 'fewafwae' }],
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'class' });

  useEffect(() => {
    const elm = mermaidElm.current;
    if (!elm) return;
    elm.innerHTML = `<div class="mermaid">${code(klass)}</div>`;
    mermaid.init('.mermaid');
  }, [klass]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const classes = data.class.map((klass) => {
      return {
        name: klass.name,
        relations: klass.relations,
        attributes: klass.attributes.map((attribute) => attribute.name),
      };
    });

    setKlass(classes);
  };

  const theme = useTheme();

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index, arr) => {
          return (
            <>
              <Box
                key={field.id}
                sx={{
                  padding: 3,
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Klass
                      control={control}
                      index={index}
                      field={field}
                      remove={remove}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Attributes control={control} index={index} />
                  </Grid>
                  <Grid item xs={4}>
                    <Relations control={control} index={index} />
                  </Grid>
                </Grid>
              </Box>
              {!(arr.length - 1 === index) && <Divider />}
            </>
          );
        })}

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Button
            type="button"
            variant="outlined"
            onClick={() =>
              append({
                attributes: [{ name: 'append1' }, { name: 'append2' }],
              })
            }
            sx={{ marginX: 2 }}
          >
            Add
          </Button>

          <Button type="submit" variant="contained" sx={{ marginX: 2 }}>
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
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h3">Code</Typography>

        <CopyToClipboard text={rowCode}>
          <Button>Copy to clipboard</Button>
        </CopyToClipboard>
        <Box sx={{ textAlign: 'left', whiteSpace: 'pre-wrap' }}>
          <h5>{rowCode}</h5>
        </Box>
      </Box>
    </>
  );
}
