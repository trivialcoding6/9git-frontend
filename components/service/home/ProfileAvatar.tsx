import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export function ProfileAvatar() {
  return (
    <div className="py-6 px-3 space-y-4">
      <div className="max-w-md mx-auto flex items-center gap-3">
        <Avatar className="w-20 h-20 border-2 border-primary">
          <AvatarImage
            src="unlocked/IMG3.webp"
            alt="profile"
            className="w-full h-full rounded-[inherit] object-cover object-top scale-100 border-1 border-primary"
          />
          <AvatarFallback>냥</AvatarFallback>
        </Avatar>

        <div className="flex-1 max-w-[calc(100%-5rem)] border-[2px] border-primary rounded-full px-4 py-3 flex flex-col justify-center">
          <div className="flex items-center gap-1">
            <span className="font-bold text-secondary text-sm">요리냥</span>
            <span className="text-sm">🐾</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: '75%' }}
            ></div>
          </div>
          <p className="text-[10px] text-gray-500 mt-1">경험치 75%</p>
        </div>
      </div>
    </div>
  );
}
