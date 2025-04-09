export const Header = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
<<<<<<< HEAD
    <header className={`sticky top-0 left-0 right-0 z-10 bg-beige-base p-1 border-b ${className}`}>
=======
    <header className="sticky top-0 left-0 right-0 z-10 bg-beige-base p-1 border-b">
>>>>>>> d1b8422 (✨ [SCRUM-32] FE 프로필 마크업)
      {children}
    </header>
  );
};
