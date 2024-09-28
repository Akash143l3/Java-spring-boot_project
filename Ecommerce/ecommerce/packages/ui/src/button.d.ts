import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import "./styles.css";
declare const buttonVariants: (props?: {
    variant?: "primary" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    size?: "sm" | "md" | "lg" | "icon";
} & import("class-variance-authority/dist/types").ClassProp) => string;
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export { Button, buttonVariants };
