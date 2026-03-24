import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

interface ProjectDialogProps {
  open: boolean;
  onClose: () => void;
  projectName: string;
  onProjectNameChange: (name: string) => void;
  onSave: () => void;
}

export function ProjectDialog({
  open,
  onClose,
  projectName,
  onProjectNameChange,
  onSave
}: ProjectDialogProps) {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      PaperProps={{
        style: {
          backgroundColor: '#ffffff',
          border: '4px solid var(--minecraft-stone)',
          borderRadius: '0'
        }
      }}
    >
      <DialogTitle sx={{ 
        backgroundColor: 'var(--minecraft-wood)',
        color: '#ffffff',
        fontFamily: "'VT323', monospace",
        fontSize: '24px'
      }}>
        プロジェクトを保存
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="プロジェクト名"
            value={projectName}
            onChange={(e) => onProjectNameChange(e.target.value)}
            sx={{ 
              '& .MuiInputLabel-root': {
                fontFamily: "'VT323', monospace",
                fontSize: '18px'
              },
              '& .MuiInputBase-root': {
                fontFamily: "'VT323', monospace",
                fontSize: '18px'
              }
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: 2, backgroundColor: 'var(--minecraft-stone)' }}>
        <Button 
          onClick={onClose}
          sx={{ 
            fontFamily: "'VT323', monospace",
            fontSize: '18px',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }
          }}
        >
          キャンセル
        </Button>
        <Button 
          onClick={onSave}
          variant="contained"
          sx={{ 
            fontFamily: "'VT323', monospace",
            fontSize: '18px',
            backgroundColor: 'var(--minecraft-grass)',
            '&:hover': {
              backgroundColor: 'var(--minecraft-wood)'
            }
          }}
        >
          保存
        </Button>
      </DialogActions>
    </Dialog>
  );
} 