import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import CodeIcon from '@mui/icons-material/Code';
import EmailIcon from '@mui/icons-material/Email';
import LoginButton from '../Login/LoginButton';
import LoginDialog from '../Login/LoginDialog';

const navItems = [
  { path: '/', label: 'ホーム', icon: <HomeIcon fontSize="small" /> },
  { path: '/editor', label: 'エディタ', icon: <CodeIcon fontSize="small" /> },
  { path: '/contact', label: 'お問い合わせ', icon: <EmailIcon fontSize="small" /> },
];

export function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

  const handleLoginSubmit = (email: string, password: string) => {
    console.log('ログイン試行', email, password);
    setLoginDialogOpen(false);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: 'rgba(245, 243, 238, 0.94)',
          color: 'var(--text)',
          borderBottom: '1px solid var(--line)',
          boxShadow: 'none',
          backdropFilter: 'blur(8px)',
        }}
      >
        <Toolbar
          sx={{
            minHeight: 'var(--nav-height)',
            px: { xs: 2, md: 3 },
            gap: 2,
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ fontSize: '0.78rem', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
              Minecraft Addon
            </Typography>
            <Typography sx={{ fontSize: '1rem', fontWeight: 700 }}>Visual Coder</Typography>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'center',
              gap: 1,
              flexWrap: 'wrap',
            }}
          >
            {navItems.map((item) => {
              const active = location.pathname === item.path;

              return (
                <Button
                  key={item.path}
                  color="inherit"
                  onClick={() => navigate(item.path)}
                  startIcon={item.icon}
                  sx={{
                    px: 2,
                    py: 1,
                    borderRadius: '10px',
                    color: active ? 'var(--text)' : 'var(--text-muted)',
                    background: active ? 'var(--surface)' : 'transparent',
                    border: '1px solid',
                    borderColor: active ? 'var(--line)' : 'transparent',
                    fontWeight: 600,
                    '&:hover': {
                      background: 'var(--surface)',
                    },
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
          </Box>

          <LoginButton onClick={() => setLoginDialogOpen(true)} variant="contained" color="primary" size="medium" />
        </Toolbar>
      </AppBar>

      <LoginDialog
        open={loginDialogOpen}
        onClose={() => setLoginDialogOpen(false)}
        onLogin={handleLoginSubmit}
      />
    </>
  );
}
