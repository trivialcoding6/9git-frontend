import { BottomTabs } from "@/components/shared/BottomTabs/BottomTabs";
import { Modal } from "@/components/shared/Modal/Modal";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <main className="flex-1 overflow-auto scrollbar-hide">{children}</main>
      <BottomTabs />
      <Modal />
    </div>
  );
}
