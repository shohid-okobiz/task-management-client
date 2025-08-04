
"use client"
import { useState } from "react";
import Wheel from "@/components/Wheel";
import Dropdown from "@/components/Dropdown";


const SpinPage = () => {
      const [selected, setSelected] = useState<string>("");
      return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center space-y-8 p-4">
            <h1 className="text-3xl font-bold">🎡 Category Wheel</h1>
            <Dropdown selected={selected} onChange={setSelected} />
            <Wheel selectedCategory={selected} />
        </div>
      )
        
    
}
export default SpinPage