import { Box, Paper, Typography, Link } from '@mui/material';

const items = [
  {
    title: 'サポート',
    body: '開発継続を支援したい場合は、コーヒー支援ページを利用できます。',
    href: 'https://www.buymeacoffee.com',
    label: '支援ページへ',
    external: true,
  },
  {
    title: 'チュートリアル',
    body: '初めて使う場合は、基本フローをまとめたガイドを先に確認できます。',
    href: '/tutorial',
    label: '使い方を見る',
    external: false,
  },
];

export function Sidebar() {
  return (
    <Box
      sx={{
        width: 'var(--sidebar-width)',
        position: 'fixed',
        right: 0,
        top: 'var(--nav-height)',
        zIndex: 2,
        display: { xs: 'none', lg: 'flex' },
        flexDirection: 'column',
        height: 'calc(100vh - var(--nav-height))',
        p: 1.5,
        pl: 0,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 2,
          flex: 1,
          overflowY: 'auto',
          borderRadius: '20px 0 0 20px',
          background: 'var(--surface)',
          border: '1px solid var(--line)',
          boxShadow: 'var(--shadow)',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          情報
        </Typography>

        {items.map((item) => (
          <Box
            key={item.title}
            sx={{
              p: 2,
              mb: 1.5,
              borderRadius: '14px',
              background: 'var(--surface-muted)',
              border: '1px solid var(--line)',
            }}
          >
            <Typography sx={{ fontWeight: 700, mb: 1 }}>{item.title}</Typography>
            <Typography sx={{ color: 'var(--text-muted)', lineHeight: 1.8, mb: 1.5 }}>{item.body}</Typography>
            <Link
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              sx={{
                textDecoration: 'none',
                color: 'var(--accent)',
                fontWeight: 600,
              }}
            >
              {item.label}
            </Link>
          </Box>
        ))}

        <Box sx={{ p: 2, borderRadius: '14px', border: '1px solid var(--line)' }}>
          <Typography sx={{ fontWeight: 700, mb: 1 }}>更新</Typography>
          <Typography sx={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
            2026/03/22
            <br />
            レイアウトと配色をシンプルな方向に調整。
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
