import Header from "@/components/header";
import Footer from "@/components/footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps): JSX.Element {
  return (
    <div className="dot-pattern flex h-screen flex-col">
      <Header />
      <div className="flex grow flex-col items-center justify-center px-4 py-14 lg:px-16 xl:px-40	">
        {children}
      </div>
      <Footer />
    </div>
  );
}
