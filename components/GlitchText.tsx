import React from 'react';

interface GlitchTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'p' | 'div';
  className?: string;
  color?: 'cyan' | 'magenta' | 'yellow' | 'white';
}

export const GlitchText: React.FC<GlitchTextProps> = ({ 
  text, 
  as: Component = 'span', 
  className = '',
  color = 'white'
}) => {
  const colorClass = {
    cyan: 'text-comic-cyan',
    magenta: 'text-comic-magenta',
    yellow: 'text-comic-yellow',
    white: 'text-white'
  }[color];

  return (
    <Component className={`relative inline-block group cursor-default ${className}`}>
      <span className={`relative z-10 ${colorClass}`}>{text}</span>
      <span className={`absolute top-0 left-0 -z-10 w-full h-full text-comic-cyan opacity-0 group-hover:opacity-70 group-hover:translate-x-[-2px] group-hover:translate-y-[-1px] transition-all duration-75 select-none`}>
        {text}
      </span>
      <span className={`absolute top-0 left-0 -z-10 w-full h-full text-comic-magenta opacity-0 group-hover:opacity-70 group-hover:translate-x-[2px] group-hover:translate-y-[1px] transition-all duration-75 delay-75 select-none`}>
        {text}
      </span>
    </Component>
  );
};