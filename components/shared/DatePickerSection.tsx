'use client';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';

type Props = {
  date?: Date;
  setDate: (date: Date | undefined) => void;
};

export function DatePickerSection({ date, setDate }: Props) {
  return (
    <div className="flex flex-col w-full max-w-full">
      <span className="mb-1 text-sm font-medium text-secondary"></span>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start text-left font-normal border-primary text-secondary"
          >
            {date ? format(date, 'PPP') : <span>날짜 선택</span>}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
        </PopoverContent>
      </Popover>
    </div>
  );
}
