import Header from "@/components/header";
import Footer from "@/components/footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps): JSX.Element {
  return (
    <>
      <div className="dot-pattern -z-1 absolute inset-0"></div>
      <Header />
      <div className="flex h-screen grow flex-col items-center justify-center overflow-x-hidden px-4 pb-14 lg:px-16 xl:px-40">
        {children}
      </div>
      <Footer />
    </>
  );
}
