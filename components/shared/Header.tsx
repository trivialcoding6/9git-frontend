export const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <header className="sticky top-0 left-0 right-0 z-10 bg-[rgb(255,241,221)] p-1 border-b">
      {children}
    </header>
  );
};
