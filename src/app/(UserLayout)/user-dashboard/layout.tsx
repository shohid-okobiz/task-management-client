import Navbar from "@/components/Navbar/Navbar";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative">
   
      <div className="relative z-10">
        <Navbar />
      </div>

      <div className="relative z-20 -mt-10">
        {children}
      </div>
    </div>
  );
}
