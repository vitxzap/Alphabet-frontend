import { useTheme } from "next-themes";
import React from "react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const ResumitIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 24, width, height, ...rest }, ref) => {
    const w = width ?? size;
    const h = height ?? size;
    const { theme } = useTheme();
    return (
      <svg
        ref={ref}
        width={w}
        height={h}
        className="shrink-0"
        viewBox="0 0 440 440"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...rest}
      >
        {/* Simplified R shape */}
        <path
          d="M 135,105 L 110,135 L 100,156 L 94,179 L 93,363 
             L 172,363 L 173,189 L 179,175 L 190,163 L 209,154 
             L 227,154 L 245,162 L 258,176 L 264,192 L 264,207 
             L 258,223 L 230,249 L 220,268 L 219,293 L 229,315 
             L 268,363 L 370,363 L 307,289 L 321,272 L 334,249 
             L 341,227 L 344,203 L 343,183 L 337,158 L 328,138 
             L 314,118 L 280,90 L 251,78 L 228,74 L 185,78 
             L 156,90 Z"
          fill="white"
        />
      </svg>
    );
  }
);

ResumitIcon.displayName = "ResumitIcon";

export default ResumitIcon;
