import React from "react";

export type Option = {
  value: string;
  label: string;
};

type Props = {
  onChange: (value: string) => void;
  value: string;
  options?: string[] | Option[];
  className?: string;
  id?: string;
};

export function Dropdown({ onChange, value, options, className, id }: Props) {
  return (
    <select
      id={id}
      className={className}
      value={value}
      onChange={(v) => {
        onChange(v.currentTarget.value);
      }}
      data-testid="dropdown"
    >
      {options?.map((o) => {
        if (typeof o == "string")
          return (
            <option key={o} value={o} data-testid="dropdown-option">
              {o}
            </option>
          );
        return (
          <option key={o.value} value={o.value} data-testid="dropdown-option">
            {o.label}
          </option>
        );
      })}
    </select>
  );
}
