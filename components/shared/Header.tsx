export const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <header className="sticky top-0 left-0 right-0 z-10 bg-beige-light p-1 border-b">
      {children}
    </header>
  );
};
