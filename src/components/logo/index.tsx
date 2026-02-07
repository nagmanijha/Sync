import { AudioWaveform } from "lucide-react";
import { cn } from "../../lib/utils";

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => (
  <div className={cn("flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground", className)}>
    <AudioWaveform className="size-4" />
  </div>
);

export default Logo;
