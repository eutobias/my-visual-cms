import { ReactNode } from "react";
import { ComponentConfig, DropZone } from "@measured/puck";
import { classNames } from "@/lib/classNames";

interface BoxProps {
  children?: ReactNode;
  className?: string;
  direction?: "row" | "column";
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around";
  gap?: number;
  wrap?: boolean;
  fullWidth?: boolean;
}

export function Box({
  children,
  className,
  direction = "row",
  align = "stretch",
  justify = "start",
  gap = 0,
  wrap = false,
  fullWidth = true,
}: BoxProps) {
  return (
    <div
      className={classNames(
        "flex",
        {
          "flex-row": direction === "row",
          "flex-col": direction === "column",
          "items-start": align === "start",
          "items-center": align === "center",
          "items-end": align === "end",
          "items-stretch": align === "stretch",
          "justify-start": justify === "start",
          "justify-center": justify === "center",
          "justify-end": justify === "end",
          "justify-between": justify === "between",
          "justify-around": justify === "around",
          "flex-wrap": wrap,
          "w-full": fullWidth,
        },
        `gap-${gap}`,
        className
      )}
    >
      {children && children}
    </div>
  );
}

export const BoxEditorConfig: ComponentConfig<BoxProps> = {
  fields: {
    direction: {
      label: "Direction",
      type: "select",
      options: [
        { label: "Horizontal", value: "row" },
        { label: "Vertical", value: "column" },
      ],
    },
  },
  defaultProps: {
    direction: "row",
    align: "start",
    justify: "start",
    gap: 0,
    wrap: true,
    fullWidth: true,
  },
  render: ({
    direction,
    align,
    justify,
    gap,
    wrap,
    fullWidth,
  }) => {
    return (
      <DropZone
        zone="my-content"
        className={classNames(
          "flex",
          {
            "flex-row": direction === "row",
            "flex-col": direction === "column",
            "items-start": align === "start",
            "items-center": align === "center",
            "items-end": align === "end",
            "items-stretch": align === "stretch",
            "justify-start": justify === "start",
            "justify-center": justify === "center",
            "justify-end": justify === "end",
            "justify-between": justify === "between",
            "justify-around": justify === "around",
            "flex-wrap": wrap,
            "w-full": fullWidth,
          },
          `gap-${gap}`
        )}
      />
    );
  },
};
