import { Button, TextField } from '@mui/material';
import { Control, Controller, useFieldArray } from 'react-hook-form';
import { FormValues } from './types';

export const Attributes = ({
  control,
  index,
}: {
  control: Control<FormValues, Object>;
  index: number;
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `class.${index}.attributes`,
  });

  return (
    <div>
      {fields.map((field, fieldIndex) => {
        return (
          <div key={fieldIndex}>
            <Controller
              name={`class.${index}.attributes.${fieldIndex}.name`}
              control={control}
              defaultValue={field.name}
              render={({ field }) => <TextField {...field} label="attribute" />}
            />
            <Button
              type="button"
              variant="contained"
              onClick={() => remove(fieldIndex)}
            >
              -
            </Button>
          </div>
        );
      })}
      <Button
        type="submit"
        variant="contained"
        onClick={() => append({ name: 'hohoge' })}
      >
        +
      </Button>
    </div>
  );
};
