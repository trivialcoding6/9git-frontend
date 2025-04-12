import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'sonner';
import { MSWProvider } from '@/components/providers/MSWProvider';

export const metadata: Metadata = {
  title: '구깃',
  description: '필요한 순간만 접어놓다, 내 하루의 구깃',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Toaster position="top-center" />
        {children}
        <MSWProvider>{children}</MSWProvider>
      </body>
    </html>
  );
}
