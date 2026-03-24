import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import LoginIcon from '@mui/icons-material/Login';

const StyledLoginButton = styled(Button)(() => ({
  textTransform: 'none',
  fontWeight: 600,
  padding: '9px 14px',
  borderRadius: '10px',
  color: 'var(--text)',
  background: 'var(--surface)',
  border: '1px solid var(--line)',
  boxShadow: 'none',
  '&:hover': {
    background: 'var(--surface-muted)',
    boxShadow: 'none',
  },
}));

interface LoginButtonProps {
  onClick?: () => void;
  fullWidth?: boolean;
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

export default function LoginButton({
  onClick,
  fullWidth = false,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  disabled = false,
}: LoginButtonProps) {
  return (
    <StyledLoginButton
      variant={variant}
      color={color}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled}
      onClick={onClick}
      startIcon={<LoginIcon />}
    >
      ログイン
    </StyledLoginButton>
  );
}
