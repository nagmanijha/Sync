import { AudioWaveform } from "lucide-react";
// import { Link } from "react-router-dom";

// interface LogoProps {
//   url?: string;
//   clickable?: boolean;
// }

const Logo = () => (
  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
    <AudioWaveform className="size-4" />
  </div>
);


export default Logo;
