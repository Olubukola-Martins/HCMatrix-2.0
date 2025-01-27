import React, { useState } from "react";

export type TChartTabItem = { name: string };

interface IProps {
  items: TChartTabItem[];
  handleChange?: (key: string) => void;
}

const ChartTabHeader = ({ items, handleChange }: IProps) => {
  const [active, setActive] = useState<string>(items[0].name);
  const handleClick = (val: TChartTabItem) => {
    setActive(val.name);
    handleChange?.(val.name);
  };

  return (
    <div className="flex rounded-md overflow-hidden shadow-sm">
      {items.map((item) => (
        <div
          key={item.name}
          onClick={() => handleClick(item)}
          className={`border border-r text-xs text-center flex-1 h-12 hover:text-caramel flex capitalize items-center justify-center cursor-pointer bg-mainBg md:text-xs ${
            active === item.name ? "text-caramel" : "text-accent"
          }`}
        >
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default ChartTabHeader;
