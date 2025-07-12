import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TooltipComponentProps {
  children: React.ReactNode;
  message: string;
  key?: string;
  side?: "top" | "right" | "bottom" | "left";
}

const TooltipComponent: React.FC<TooltipComponentProps> = ({
  children,
  key,
  message,
  side = "bottom",
}) => {
  return (
    <TooltipProvider disableHoverableContent key={key}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side} className="text-xs capitalize">
          {message}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipComponent;
