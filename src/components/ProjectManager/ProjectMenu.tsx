import { Menu, MenuItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Project } from '../../types/project';

interface ProjectMenuProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  projects: Project[];
  onLoadProject: (project: Project) => void;
  onDeleteProject: (projectId: string) => void;
}

export function ProjectMenu({
  anchorEl,
  onClose,
  projects,
  onLoadProject,
  onDeleteProject
}: ProjectMenuProps) {
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: 'var(--minecraft-stone)',
          border: '2px solid #000000',
          color: '#ffffff',
          '& .MuiMenuItem-root': {
            fontFamily: "'VT323', monospace",
            fontSize: '18px'
          }
        }
      }}
    >
      {projects.map((project) => (
        <MenuItem 
          key={project.id}
          onClick={() => onLoadProject(project)}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 2
          }}
        >
          <ListItemText 
            primary={project.name}
            secondary={new Date(project.lastModified).toLocaleDateString()}
            sx={{
              '& .MuiListItemText-primary': {
                color: '#ffffff'
              },
              '& .MuiListItemText-secondary': {
                color: 'rgba(255, 255, 255, 0.7)'
              }
            }}
          />
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteProject(project.id);
            }}
            sx={{ color: '#ffffff' }}
          >
            <DeleteIcon />
          </IconButton>
        </MenuItem>
      ))}
      {projects.length === 0 && (
        <MenuItem disabled>
          <ListItemText primary="プロジェクトがありません" />
        </MenuItem>
      )}
    </Menu>
  );
} 