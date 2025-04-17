import { SidebarHeader } from './SidebarHeader';
import { SidebarItem } from './SidebarItem';

export const Sidebar = () => {
  return (
    <div className="fixed inset-0 z-50 max-w-[440px] mx-auto flex bg-black/70">
      <div className="fixed top-0 h-full w-96 bg-beige-light z-50">
        <SidebarHeader />
        <SidebarItem />
      </div>
    </div>
  );
};
