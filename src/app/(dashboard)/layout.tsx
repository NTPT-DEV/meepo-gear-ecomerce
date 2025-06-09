
import { SessionProvider } from "next-auth/react";
import "../globals.css";
import MenuDashBoard from "./D-Components/ui/MenuDashBoard";
import NavbarDash from "./D-Components/NavBarDash";


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NavbarDash />
      <MenuDashBoard />
      <SessionProvider>{children}</SessionProvider>
    </div>

  );
}
