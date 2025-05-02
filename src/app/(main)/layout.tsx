import Footer from "../components/Layout/Footer";
import Navbar from "../components/Layout/Navbar";
import "../globals.css";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col w-full min-h-screen justify-between">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
