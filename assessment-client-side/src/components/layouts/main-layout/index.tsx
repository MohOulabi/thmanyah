import { AppSidebar } from '@/components/layouts/main-layout/app-sidebar';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return <AppSidebar>{children}</AppSidebar>;
};
