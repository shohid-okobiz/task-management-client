import Navbar from "@/components/Navbar/Navbar";


export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="">
            <Navbar
                userName="tomas"
            //   avatarUrl="http://www.emni.com"
            // onLogout={() => { }}
            />
            {children}

        </div>
    );
}
