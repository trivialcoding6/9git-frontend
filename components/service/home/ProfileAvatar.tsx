import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { PawPrint } from 'lucide-react';

export function ProfileAvatar() {
  return (
    <div className="py-6 px-3 space-y-4">
      <div className="max-w-md mx-auto flex items-center gap-3">
        <Avatar className="w-20 h-20 border-2 border-secondary">
          <AvatarImage
            src="unlocked/IMG3.webp"
            alt="profile"
            className="w-full h-full rounded-[inherit] object-cover object-top scale-100 border-1 border-secondary"
          />
          <AvatarFallback>냥</AvatarFallback>
        </Avatar>

        <div className="flex-1 max-w-[calc(90%-5rem)] border-[2px] border-secondary rounded-full px-3 py-2 flex flex-col justify-center">
          <div className="flex items-center gap-1 px-1">
            <span className="text-secondary text-lg">요리냥</span>
            <PawPrint className="fill-secondary text-secondary w-3.5 h-3.5" />
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-0.5">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: '75%' }}
            />
          </div>
          <p className="text-[10px] text-gray-500 mt-1 px-1">경험치 75%</p>
        </div>
      </div>
    </div>
  );
}
