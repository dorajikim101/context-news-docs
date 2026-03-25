export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body style={{ margin: 0, fontFamily: 'Inter, Arial, sans-serif', background: '#0f1220', color: '#f4f6fb' }}>
        {children}
      </body>
    </html>
  );
}
