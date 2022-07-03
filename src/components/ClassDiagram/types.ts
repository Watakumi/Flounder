export type FormValues = {
  class: {
    name: string;
    relations: { type: string; target: string }[];
    attributes: { name: string }[];
  }[];
};
