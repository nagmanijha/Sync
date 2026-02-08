import { cn } from "../../lib/utils";

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => (
  <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-lg", className)}>
    S
  </div>
);

export default Logo;
