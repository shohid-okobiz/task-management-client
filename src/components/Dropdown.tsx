import { categories } from "@/components/data/categories";
import React from "react";


interface Props {
  selected: string;
  onChange: (value: string) => void;
}

const Dropdown: React.FC<Props> = ({ selected, onChange }) => {
  return (
    <select
      className="border px-4 py-2 rounded-md shadow"
      value={selected}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Select Category</option>
      {categories.map((cat) => (
        <option key={cat.label} value={cat.label}>
          {cat.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
