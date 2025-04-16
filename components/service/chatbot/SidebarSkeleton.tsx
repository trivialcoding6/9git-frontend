export const SidebarSkeleton = () => {
  return (
    <div className="animate-pulse mb-6">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-[18px] h-[18px] rounded-full bg-beige-deco" />
        <div className="h-5 bg-beige-deco rounded w-24" />
      </div>
      <div className="pl-2 space-y-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="h-4 bg-beige-deco rounded w-4/5 mb-3" />
          </div>
        ))}
      </div>
    </div>
  );
};
