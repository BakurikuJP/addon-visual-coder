import { Container, Typography, Box, Paper } from '@mui/material';
import { Navigation } from '../components/Navigation/Navigation';
import { Sidebar } from '../components/Sidebar/Sidebar';

export function TutorialPage() {
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
            p: { xs: 3, md: 4 },
            borderRadius: '20px',
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            boxShadow: 'var(--shadow)',
          }}
        >
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              使い方ガイド
            </Typography>
            <Typography sx={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
              ブロック作成からコード出力までの基本的な流れをまとめています。
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              動画で確認する
            </Typography>
            <Box
              sx={{
                position: 'relative',
                paddingBottom: '56.25%',
                height: 0,
                overflow: 'hidden',
                borderRadius: '14px',
                border: '1px solid var(--line)',
              }}
            >
              <iframe
                src="https://www.youtube.com/embed/s5FfekrYQcc"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </Box>
          </Box>

          <Box sx={{ p: 3, borderRadius: '14px', background: 'var(--surface-muted)', border: '1px solid var(--line)' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              基本手順
            </Typography>
            <Typography component="div" sx={{ lineHeight: 2, color: 'var(--text-muted)' }}>
              <p>1. エディタを開き、左のカテゴリから必要なブロックを選びます。</p>
              <p>2. ワークスペースに配置し、イベント・条件・処理の順に接続します。</p>
              <p>3. 右のコードプレビューで生成結果を確認します。</p>
              <p>4. 問題なければコピー、またはダウンロードしてアドオンへ組み込みます。</p>
            </Typography>
          </Box>
        </Paper>
      </Container>
      <Sidebar />
    </div>
  );
}
