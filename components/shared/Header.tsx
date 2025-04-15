export const Header = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <header className={`sticky top-0 left-0 right-0 z-10 bg-beige-base p-1 border-b ${className}`}>
      {children}
    </header>
  );
};
