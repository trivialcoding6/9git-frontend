import { AuthHeader } from '@/components/service/auth/AuthHeader';
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center bg-gray-50 gap-8">
      <AuthHeader />
      {children}
    </main>
  );
}
