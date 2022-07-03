import { Button, TextField, Typography } from '@mui/material';
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
import { Attributes } from './components';

export const code = ({
  name,
  attributes,
}: {
  name: string;
  attributes: string[];
}) => {
  return `
  classDiagram \n
  ${classBlock(name, attributes)}
  `;
};

const classBlock = (name: string, attributes: string[]) => {
  return `
    class ${name}{
      ${attributes.join('\n')}
    }
  `;
};

export function ClassDiagram() {
  const mermaidElm = useRef<HTMLDivElement>(null);
  const [klass, setKlass] = useState({
    name: 'Hoge',
    attributes: ['fuga', 'piyo'],
  });

  const outputs = code(klass).split('\n');

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      class: [
        {
          name: 'Hoge',
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
    const attributes = data.class[0].attributes.map(
      (attribute) => attribute.name
    );

    setKlass({
      name: data.class[0].name,
      attributes: attributes,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <Controller
                name={`class.${index}.name`}
                control={control}
                defaultValue={field.name}
                render={({ field }) => <TextField {...field} label="class" />}
              />
              <Attributes control={control} index={index} />
              <Button onClick={() => remove(index)}>DELETE</Button>
            </div>
          );
        })}

        <Button
          type="button"
          variant="outlined"
          onClick={() =>
            append({
              attributes: [{ name: 'append1' }, { name: 'append2' }],
            })
          }
        >
          Add
        </Button>

        <Button type="submit" variant="contained">
          Submit
        </Button>
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
