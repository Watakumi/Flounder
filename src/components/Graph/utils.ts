import { GroupElm } from './types';

export const code = (groups: GroupElm[]) => {
  const lines = groups.map((group) => Group(group)).join('');
  return `${graphDiagram} \n${lines};`;
};

const graphDiagram = 'flowchart LR';
const newLine = ' \n';

const Group = ({ from, toOrArrow, target }: GroupElm) => {
  return `${from} ${toOrArrow} ${target} ${newLine}`;
};

export const mermaidHTML = (code: string) => {
  return `<div class="mermaid">${code}</div>`;
};
