import "../globals.css";
import Navbar from "./D-Components/NavBarDash";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      {children}
    </div>

  );
}
