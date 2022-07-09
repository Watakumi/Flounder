import { Box, Button, MenuItem, Select, TextField } from '@mui/material';
import {
  Control,
  Controller,
  FieldArrayWithId,
  useFieldArray,
  UseFieldArrayRemove,
} from 'react-hook-form';
import { FormValues } from './types';
import { relationships } from './utils';

export const Klass = ({
  control,
  index,
  field,
  remove,
}: {
  control: Control<FormValues, Object>;
  index: number;
  field: FieldArrayWithId<FormValues, 'class', 'id'>;
  remove: UseFieldArrayRemove;
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Controller
        name={`class.${index}.name`}
        control={control}
        defaultValue={field.name}
        render={({ field }) => <TextField {...field} label="class" />}
      />
      <Button onClick={() => remove(index)}>DELETE</Button>
    </Box>
  );
};

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
          <Box
            key={fieldIndex}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginY: 2,
            }}
          >
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
              sx={{ marginX: 2 }}
            >
              -
            </Button>
          </Box>
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
          <Box
            key={fieldIndex}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginY: 2,
            }}
          >
            <Controller
              name={`class.${index}.relations.${fieldIndex}.type`}
              control={control}
              defaultValue={field.type}
              render={({ field }) => (
                <Select {...field}>
                  {Object.values(relationships).map(([value, name]) => (
                    <MenuItem value={value}>{name}</MenuItem>
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
              sx={{ marginX: 2 }}
            >
              -
            </Button>
          </Box>
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
