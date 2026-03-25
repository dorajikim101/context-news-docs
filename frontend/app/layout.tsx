export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body
        style={{
          margin: 0,
          fontFamily: 'Inter, Arial, sans-serif',
          background: 'radial-gradient(circle at top, #19203a 0%, #0f1220 48%, #0b0e19 100%)',
          color: '#f4f6fb',
          minHeight: '100vh',
        }}
      >
        {children}
      </body>
    </html>
  );
}
