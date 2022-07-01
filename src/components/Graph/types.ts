export type GroupElm = {
  from: string;
  toOrArrow: string;
  target: string;
};

export type FormValues = {
  groups: {
    from: string;
    target: string;
    toOrArrow: string;
    withText: string;
  }[];
};
