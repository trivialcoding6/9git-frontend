import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export const ProfileHeaderContent = () => {
  return (
    <nav className="flex items-center justify-between m-[6px]">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src="" className="bg-white" />
          <AvatarFallback className="bg-white">U</AvatarFallback>
        </Avatar>
        <p className="text-sm font-medium">홍길동</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" className="border-none shadow-none">
          나의 정보
        </Button>
        <Button variant="outline" className="border-none shadow-none">
          로그아웃
        </Button>
      </div>
    </nav>
  );
};
