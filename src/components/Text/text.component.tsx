import { ComponentConfig } from "@measured/puck";
import React from "react";

type TextTag = "p" | "span" | "strong" | "em";

interface TextProps {
  as?: TextTag;
  variant?: "body" | "large" | "small" | "caption";
  children: React.ReactNode;
  className?: string;
}

export const Text: React.FC<TextProps> = ({
  as = "p",
  variant = "body",
  children,
  className = "",
}) => {
  const baseStyles = "text-gray-700 dark:text-gray-300";

  const variantStyles = {
    body: "text-base md:text-lg",
    large: "text-lg md:text-xl",
    small: "text-sm md:text-base",
    caption: "text-xs md:text-sm",
  };

  const Component = as;

  return (
    <Component
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </Component>
  );
};

export const TextEditorConfig: ComponentConfig<TextProps> = {
  fields: {
    children: {
      label: "Texto",
      type: "text",
    },
    variant: {
      label: "Variante",
      type: "select",
      options: [
        { label: "Body", value: "body" },
        { label: "Large", value: "large" },
        { label: "Small", value: "small" },
        { label: "Caption", value: "caption" },
      ],
    },
  },
  defaultProps: {
    children:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    variant: "body",
  },
  render: ({ children, variant }) => {
    return <Text variant={variant}>{children}</Text>;
  },
};
