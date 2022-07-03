import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useRef } from 'react';
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

export const code = () => {
  return `
  classDiagram \n
  class BankAccount \n
  BankAccount : +String owner \n
  BankAccount : +Bigdecimal balance \n
  BankAccount : +deposit(amount) \n
  BankAccount : +withdrawal(amount) \n
  `;
};

export function ClassDiagram() {
  const mermaidElm = useRef<HTMLDivElement>(null);
  const outputs = code().split('\n');

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
    elm.innerHTML = `<div class="mermaid">${code()}</div>`;
    mermaid.init('.mermaid');
  }, []);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
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

const Display = ({
  control,
  index,
}: {
  control: Control<FormValues, Object>;
  index: number;
}) => {
  const data = useWatch({
    control,
    name: `class.${index}`,
  });
  return <p>{data?.name}</p>;
};
