import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

export const code = () => {
  return `
  classDiagram
  class BankAccount
  BankAccount : +String owner
  BankAccount : +Bigdecimal balance
  BankAccount : +deposit(amount)
  BankAccount : +withdrawal(amount)
  `;
};

export function ClassDiagram() {
  const mermaidElm = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elm = mermaidElm.current;
    if (!elm) return;
    elm.innerHTML = `<div class="mermaid">${code()}</div>`;
    mermaid.init('.mermaid');
  }, []);

  return (
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
  );
}
