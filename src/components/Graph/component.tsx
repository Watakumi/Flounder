import { Box, Button, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

export function Code({ outputs }: { outputs: Array<string> }) {
  const startText = '```mermaid \n';
  const endText = '\n ```';
  const rowCode = `${startText}${outputs.join('\n')}${endText}`;
  return (
    <Box
      sx={{
        marginTop: '3vh',
        paddingY: '3vh',
        border: 2,
        borderColor: 'gray',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h3">Code</Typography>

      <CopyToClipboard text={rowCode}>
        <Button>Copy to clipboard</Button>
      </CopyToClipboard>

      <Box sx={{ textAlign: 'left', whiteSpace: 'pre-wrap' }}>
        <h5>{rowCode}</h5>
      </Box>
    </Box>
  );
}
