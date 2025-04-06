import AuthLayout from '@/layouts/AuthLayout';

export default function AuthPageLayout({ children }: { children: React.ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>;
};