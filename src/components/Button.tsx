import { ButtonHTMLAttributes, ReactNode } from "react";

import '../styles/button.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function Button ({children, ...props}: ButtonProps) {
  return (
    <button className="button" {...props}>
      {children}
    </button>
  )
}
