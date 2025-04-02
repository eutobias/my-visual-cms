import { ComponentConfig } from "@measured/puck";
import React from "react";

interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
}

export const Heading: React.FC<HeadingProps> = ({
  level = 1,
  children,
  className = "",
}) => {
  const baseStyles = "font-bold text-gray-900 dark:text-white";

  const sizeStyles = {
    1: "text-4xl md:text-5xl mb-6",
    2: "text-3xl md:text-4xl mb-5",
    3: "text-2xl md:text-3xl mb-4",
    4: "text-xl md:text-2xl mb-3",
    5: "text-lg md:text-xl mb-2",
    6: "text-base md:text-lg mb-2",
  };

  const Component = `h${level}` as keyof React.JSX.IntrinsicElements;

  return (
    <Component className={`${baseStyles} ${sizeStyles[level]} ${className}`}>
      {children}
    </Component>
  );
};

export const HeadingEditorConfig: ComponentConfig<HeadingProps> = {
  fields: {
    children: {
      label: "Texto",
      type: "text",
    },
    level: {
      label: "Variante",
      type: "select",
      options: [
        { label: "H1", value: 1 },
        { label: "H2", value: 2 },
        { label: "H3", value: 3 },
        { label: "H4", value: 4 },
        { label: "H5", value: 5 },
        { label: "H6", value: 6 },
      ],
    },
  },
  defaultProps: {
    children: "Hello, world",
    level: 1,
  },
  render: ({ children, level }) => {
    return <Heading level={level}>{children}</Heading>;
  },
};
