import { Box, Typography, Paper } from '@mui/material';
import { Language, messages } from '../../i18n';

interface CodePreviewProps {
  generatedCode: string;
  language: Language;
}

export function CodePreview({ generatedCode, language }: CodePreviewProps) {
  const text = messages[language];

  return (
    <Paper
      elevation={0}
      sx={{
        position: { xs: 'relative', xl: 'fixed' },
        right: 0,
        top: 0,
        width: { xs: '100%', xl: 'var(--preview-width)' },
        height: { xs: 'auto', xl: '100vh' },
        p: 2,
        background: 'var(--surface)',
        color: 'var(--text)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        borderLeft: { xl: '1px solid var(--line)' },
        boxShadow: 'var(--shadow)',
      }}
    >
      <Typography sx={{ fontWeight: 700, mb: 2 }}>{text.code}</Typography>
      <Box
        sx={{
          p: 2,
          flex: 1,
          overflow: 'auto',
          whiteSpace: 'pre-wrap',
          borderRadius: '14px',
          background: 'var(--surface-dark)',
          border: '1px solid #2d333b',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '0.84rem',
          lineHeight: 1.75,
          color: 'var(--text-on-dark)',
        }}
      >
        {generatedCode || text.emptyCode}
      </Box>
    </Paper>
  );
}
