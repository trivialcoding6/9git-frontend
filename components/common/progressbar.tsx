import { Progress } from "@/components/ui/progress"


interface ProgressBarProps {
  value: number
  className?: string
  indicatorClassName?: string
}

export default function ProgressBar({value,className,indicatorClassName}:ProgressBarProps){
    return(
        <div>
            <div className="text-xs text-right text-[#79522F] font-semibold">{value}% 달성</div>
            <Progress value={value}
            className={className}
            indicatorClassName={indicatorClassName} 
                />
        </div>
    )
}