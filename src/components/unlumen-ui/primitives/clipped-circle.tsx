import { cn } from "@/lib/utils";

interface ClippedCircleProps {
  circleClassName?: string;
  circleSize?: number;
}

export function ClippedCircle({ circleClassName, circleSize = 800 }: ClippedCircleProps) {
  return (
    <div 
      className={cn("absolute z-0 pointer-events-none rounded-full opacity-5 blur-3xl", circleClassName)}
      style={{
        width: circleSize,
        height: circleSize,
        top: '100%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}
    />
  );
}
