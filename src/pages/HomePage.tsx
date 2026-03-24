import { Container, Typography, Button, Box, Paper, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '../components/Navigation/Navigation';
import { Sidebar } from '../components/Sidebar/Sidebar';
import CodeIcon from '@mui/icons-material/Code';
import EmailIcon from '@mui/icons-material/Email';

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <Navigation />
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          pr: { xs: 0, lg: 'var(--sidebar-width)' },
          minHeight: 'calc(100vh - var(--nav-height))',
          mt: 'var(--nav-height)',
          p: { xs: 2, md: 3 },
        }}
      >
        <Paper
          elevation={0}
          sx={{
            minHeight: 'calc(100vh - var(--nav-height) - 32px)',
            p: { xs: 3, md: 5 },
            borderRadius: '20px',
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            boxShadow: 'var(--shadow)',
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: '1.3fr 0.8fr' },
              gap: 4,
              alignItems: 'start',
            }}
          >
            <Box>
              <Typography sx={{ color: 'var(--text-muted)', mb: 1 }}>Minecraft Addon Visual Coder</Typography>
              <Typography
                component="h1"
                sx={{
                  fontSize: { xs: '2rem', md: '3.5rem' },
                  lineHeight: 1.1,
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  mb: 2,
                }}
              >
                ブロックで
                <br />
                アドオンの挙動を組み立てる
              </Typography>
              <Typography sx={{ maxWidth: 720, color: 'var(--text-muted)', lineHeight: 1.9, mb: 4 }}>
                イベント、条件、処理を視覚的に接続して、Minecraft アドオン向けのコードを生成できます。試作や学習用途で、複雑な実装に入る前の設計を早く進めるためのツールです。
              </Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/editor')}
                  startIcon={<CodeIcon />}
                  sx={{
                    px: 3,
                    py: 1.5,
                    borderRadius: '10px',
                    background: 'var(--accent)',
                    boxShadow: 'none',
                  }}
                >
                  エディタを開く
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/contact')}
                  startIcon={<EmailIcon />}
                  sx={{
                    px: 3,
                    py: 1.5,
                    borderRadius: '10px',
                    color: 'var(--text)',
                    borderColor: 'var(--line-strong)',
                  }}
                >
                  お問い合わせ
                </Button>
              </Stack>
            </Box>

            <Box sx={{ display: 'grid', gap: 1.5 }}>
              <Paper elevation={0} sx={{ p: 2.5, borderRadius: '14px', background: 'var(--surface-muted)', border: '1px solid var(--line)' }}>
                <Typography sx={{ fontWeight: 700, mb: 1 }}>できること</Typography>
                <Typography sx={{ color: 'var(--text-muted)', lineHeight: 1.9 }}>
                  ブロック配置
                  <br />
                  条件分岐
                  <br />
                  コード確認
                  <br />
                  ダウンロード
                </Typography>
              </Paper>

              <Paper elevation={0} sx={{ p: 2.5, borderRadius: '14px', background: 'var(--surface-muted)', border: '1px solid var(--line)' }}>
                <Typography sx={{ fontWeight: 700, mb: 1 }}>使い方</Typography>
                <Typography sx={{ color: 'var(--text-muted)', lineHeight: 1.9 }}>
                  1. ブロックを置く
                  <br />
                  2. 接続する
                  <br />
                  3. 右側でコードを見る
                </Typography>
              </Paper>
            </Box>
          </Box>
        </Paper>
      </Container>
      <Sidebar />
    </div>
  );
}
