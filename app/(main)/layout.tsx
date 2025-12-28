import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default async function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-100">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}