import { Button, MenuItem, Select, TextField } from '@mui/material';
import { Control, Controller, useFieldArray } from 'react-hook-form';
import { FormValues } from './types';
import { relationships } from './utils';

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

export const Relations = ({
  control,
  index,
}: {
  control: Control<FormValues, Object>;
  index: number;
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `class.${index}.relations`,
  });
  return (
    <div>
      {fields.map((field, fieldIndex) => {
        return (
          <div key={fieldIndex}>
            <Controller
              name={`class.${index}.relations.${fieldIndex}.type`}
              control={control}
              defaultValue={field.type}
              render={({ field }) => (
                <Select {...field}>
                  {Object.values(relationships).map((relationship) => (
                    <MenuItem value={relationship[0]}>
                      {relationship[1]}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <Controller
              name={`class.${index}.relations.${fieldIndex}.target`}
              control={control}
              defaultValue={field.target}
              render={({ field }) => <TextField {...field} label="Target" />}
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
        onClick={() =>
          append({ type: relationships.inheritence[0], target: 'hoge' })
        }
      >
        +
      </Button>
    </div>
  );
};
