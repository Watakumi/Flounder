import { Box, Typography } from '@mui/material';

export function Code({ outputs }: { outputs: Array<string> }) {
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
      <Typography variant="h3">Code</Typography>
      <Box>
        <h5>```mermaid</h5>
        {outputs.map((output, index) => (
          <h5 key={index}>{output}</h5>
        ))}
        <h5>```</h5>
      </Box>
    </Box>
  );
}
