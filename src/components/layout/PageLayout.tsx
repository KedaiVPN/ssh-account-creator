
import { useEffect, useState } from "react";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [show, setShow] = useState(true);

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className={`bg-[#006400] text-white py-3 fixed w-full z-50 transition-transform duration-300 ${show ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="container px-4">
          <div className="flex items-center">
            <div className="text-left">
              <h1 className="text-2xl font-bold">Kedai SSH</h1>
              <p className="text-sm text-white/80">the fastest speed server</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="min-h-screen bg-background pt-20 px-4">
        <div className="container max-w-4xl mx-auto py-8">
          {children}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#006400] text-white py-3">
        <div className="container px-4">
          <div className="text-center">
            <h2 className="text-lg font-bold mb-1">Kedai SSH</h2>
            <p className="text-xs text-white/80">
              © {new Date().getFullYear()} Kedai SSH. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PageLayout;
