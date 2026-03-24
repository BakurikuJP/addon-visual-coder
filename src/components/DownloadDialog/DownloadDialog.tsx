import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Typography } from '@mui/material';
import { Language, messages } from '../../i18n';

interface DownloadDialogProps {
  open: boolean;
  onClose: () => void;
  folderName: string;
  fileName: string;
  language: Language;
  onFolderNameChange: (name: string) => void;
  onFileNameChange: (name: string) => void;
  onDownload: () => void;
}

export function DownloadDialog({
  open,
  onClose,
  folderName,
  fileName,
  language,
  onFolderNameChange,
  onFileNameChange,
  onDownload,
}: DownloadDialogProps) {
  const text = messages[language];

  const fieldSx = {
    mb: 2,
    '& .MuiOutlinedInput-root': {
      borderRadius: '10px',
      background: 'var(--surface)',
    },
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: '100%',
          maxWidth: 520,
          borderRadius: '18px',
          color: 'var(--text)',
          background: 'var(--bg)',
          border: '1px solid var(--line)',
          boxShadow: 'var(--shadow)',
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {text.downloadSettings}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 1 }}>
          <TextField
            fullWidth
            label={text.folderName}
            value={folderName}
            onChange={(e) => onFolderNameChange(e.target.value)}
            sx={fieldSx}
            helperText={text.folderExample}
          />
          <TextField
            fullWidth
            label={text.fileName}
            value={fileName}
            onChange={(e) => onFileNameChange(e.target.value)}
            sx={fieldSx}
            helperText={text.fileExample}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} sx={{ color: 'var(--text-muted)' }}>
          {text.cancel}
        </Button>
        <Button
          onClick={onDownload}
          variant="contained"
          sx={{
            px: 3,
            borderRadius: '10px',
            background: 'var(--accent)',
            boxShadow: 'none',
          }}
        >
          {text.download}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
