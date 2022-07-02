import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

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

  useEffect(() => {
    const elm = mermaidElm.current;
    if (!elm) return;
    elm.innerHTML = `<div class="mermaid">${code()}</div>`;
    mermaid.init('.mermaid');
  }, []);

  return (
    <>
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
