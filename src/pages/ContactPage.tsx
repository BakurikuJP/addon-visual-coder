import { Container, Typography, TextField, Button, Box, Paper } from '@mui/material';
import { useState } from 'react';
import { Navigation } from '../components/Navigation/Navigation';
import SendIcon from '@mui/icons-material/Send';

export function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, message });
    alert('お問い合わせを受け付けました。確認後、必要に応じて返信します。');
    setName('');
    setEmail('');
    setMessage('');
  };

  const fieldSx = {
    mb: 3,
    '& .MuiOutlinedInput-root': {
      borderRadius: '10px',
      background: 'var(--surface)',
    },
  };

  return (
    <div className="app-container">
      <Navigation />
      <Container
        maxWidth="lg"
        sx={{
          pt: 'calc(var(--nav-height) + 20px)',
          pb: 4,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: '20px',
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            boxShadow: 'var(--shadow)',
          }}
        >
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              お問い合わせ
            </Typography>
            <Typography sx={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
              不具合報告、改善要望、制作相談などを受け付けています。
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField fullWidth label="お名前" value={name} onChange={(e) => setName(e.target.value)} required sx={fieldSx} />

            <TextField
              fullWidth
              label="メールアドレス"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={fieldSx}
            />

            <TextField
              fullWidth
              label="お問い合わせ内容"
              multiline
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              sx={fieldSx}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              startIcon={<SendIcon />}
              sx={{
                px: 3,
                py: 1.4,
                borderRadius: '10px',
                background: 'var(--accent)',
                boxShadow: 'none',
              }}
            >
              送信する
            </Button>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}
