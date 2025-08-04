import React, { useRef, useState } from "react";
import { categories } from "./data/categories";


interface Props {
  selectedCategory: string;
}

const Wheel: React.FC<Props> = ({ selectedCategory }) => {
  const wheelRef = useRef<HTMLDivElement>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState("");

  const spinWheel = () => {
    if (!selectedCategory || isSpinning) return;

    const index = categories.findIndex((c) => c.label === selectedCategory);
    if (index === -1) return;

    const segmentAngle = 360 / categories.length;
    const randomOffset = Math.random() * (segmentAngle - 5);
    const stopAngle = 360 - index * segmentAngle - randomOffset;

    const totalRotation = 360 * 5 + stopAngle;

    setIsSpinning(true);
    setResult("");

    if (wheelRef.current) {
      wheelRef.current.style.transition = "transform 5s ease-out";
      wheelRef.current.style.transform = `rotate(${totalRotation}deg)`;
    }

    setTimeout(() => {
      setIsSpinning(false);
      setResult(selectedCategory);
    }, 5100);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative w-[300px] h-[300px] rounded-full border-4 border-gray-300">
        <div
          ref={wheelRef}
          className="absolute top-0 left-0 w-full h-full origin-center"
        >
          <svg
            viewBox="0 0 200 200"
            width="100%"
            height="100%"
            className="rotate-[-90deg]" // Start at top
          >
            {categories.map((cat, i) => {
              const angle = (360 / categories.length) * i;
              const nextAngle = angle + 360 / categories.length;
              const x1 = 100 + 100 * Math.cos((Math.PI * angle) / 180);
              const y1 = 100 + 100 * Math.sin((Math.PI * angle) / 180);
              const x2 = 100 + 100 * Math.cos((Math.PI * nextAngle) / 180);
              const y2 = 100 + 100 * Math.sin((Math.PI * nextAngle) / 180);
              const largeArc = nextAngle - angle > 180 ? 1 : 0;

              return (
                <path
                  key={cat.label}
                  d={`M100,100 L${x1},${y1} A100,100 0 ${largeArc} 1 ${x2},${y2} Z`}
                  fill={cat.color}
                  stroke="#fff"
                />
              );
            })}
            {categories.map((cat, i) => {
              const midAngle =
                (360 / categories.length) * (i + 0.5) - 90; // Adjust rotation
              const rad = (Math.PI * midAngle) / 180;
              const x = 100 + 60 * Math.cos(rad);
              const y = 100 + 60 * Math.sin(rad);

              return (
                <text
                  key={cat.label}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="10"
                  fill="#fff"
                >
                  {cat.label}
                </text>
              );
            })}
          </svg>
        </div>
      </div>
      <button
        onClick={spinWheel}
        disabled={isSpinning || !selectedCategory}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {isSpinning ? "Spinning..." : "Spin"}
      </button>
      {result && (
        <p className="text-green-600 text-lg font-medium">
          🎉 Result: {result}
        </p>
      )}
    </div>
  );
};

export default Wheel;
