import Link from "next/link";

type Props = {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
};

export const NavItem = ({ href, icon, label, isActive }: Props) => {
  return (
    <Link href={href} className="flex flex-col items-center">
      <div className={`p-1 ${isActive ? "text-[#FDA63A]" : "text-gray-500"}`}>
        {icon}
      </div>
      <span
        className={`text-xs ${isActive ? "text-[#FDA63A]" : "text-gray-500"}`}
      >
        {label}
      </span>
    </Link>
  );
};
