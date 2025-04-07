import Link from 'next/link';

type Props = {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
};

export const NavItem = ({ href, icon, label, isActive }: Props) => {
  return (
    <Link href={href} className="flex flex-col items-center">
      <div className={`p-1 ${isActive ? 'text-primary' : 'text-main-gray'}`}>{icon}</div>
      <span className={`text-xs ${isActive ? 'text-primary' : 'text-main-gray'}`}>{label}</span>
    </Link>
  );
};
