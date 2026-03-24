import { useRef } from 'react';
import { Box, Button, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { CodePreview } from '../components/CodePreview/CodePreview';
import { DownloadDialog } from '../components/DownloadDialog/DownloadDialog';
import { useBlockly } from '../hooks/useBlockly';
import { useDownload } from '../hooks/useDownload';
import { Language, messages } from '../i18n';
import { setItemLanguage } from '../constants/items';

interface EditorPageProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
}

export function EditorPage({ language, onLanguageChange }: EditorPageProps) {
  const workspaceRef = useRef<HTMLDivElement>(null);
  setItemLanguage(language);
  const { generatedCode } = useBlockly({ workspaceRef, language });
  const {
    downloadDialogOpen,
    setDownloadDialogOpen,
    folderName,
    setFolderName,
    fileName,
    setFileName,
    handleDownload,
  } = useDownload();
  const text = messages[language];

  return (
    <div className="app-container">
      <Box className="editor-toolbar">
        <Box className="language-switcher">
          <Typography sx={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{text.language}</Typography>
          <ToggleButtonGroup
            exclusive
            size="small"
            value={language}
            onChange={(_, value: Language | null) => {
              if (value) {
                onLanguageChange(value);
              }
            }}
            sx={{
              '& .MuiToggleButton-root': {
                px: 1.5,
                py: 0.5,
                border: '1px solid var(--line)',
                color: 'var(--text-muted)',
                textTransform: 'none',
              },
              '& .Mui-selected': {
                color: 'var(--text)',
                background: 'var(--surface-muted)',
              },
            }}
          >
            <ToggleButton value="ja">{text.japanese}</ToggleButton>
            <ToggleButton value="en">{text.english}</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Button
          variant="outlined"
          onClick={() => setDownloadDialogOpen(true)}
          sx={{
            borderColor: 'var(--line)',
            color: 'var(--text)',
            borderRadius: '12px',
            px: 2,
            textTransform: 'none',
            background: 'rgba(255, 255, 255, 0.9)',
          }}
        >
          {text.download}
        </Button>
      </Box>

      <div className="workspace-container">
        <div ref={workspaceRef} className="blockly-workspace" />
        <CodePreview generatedCode={generatedCode} language={language} />
      </div>

      <DownloadDialog
        open={downloadDialogOpen}
        onClose={() => setDownloadDialogOpen(false)}
        folderName={folderName}
        fileName={fileName}
        language={language}
        onFolderNameChange={setFolderName}
        onFileNameChange={setFileName}
        onDownload={() => handleDownload(generatedCode)}
      />
    </div>
  );
}
