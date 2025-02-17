
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [show, setShow] = useState(true);
  const navigate = useNavigate();

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
    <div className="min-h-screen flex flex-col bg-[#f3f3f3]">
      {/* Header */}
      <header className={`bg-[#006400] text-white py-3 fixed w-full z-50 transition-transform duration-300 ${show ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white md:hidden">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>
                  <div className="py-4">
                    <nav className="space-y-2">
                      <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/')}>
                        Beranda
                      </Button>
                      <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/profile')}>
                        Profil
                      </Button>
                      <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/settings')}>
                        Pengaturan
                      </Button>
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
              <div>
                <h1 className="text-2xl font-bold">Kedai SSH</h1>
                <p className="text-sm text-white/80">the fastest speed server</p>
              </div>
            </div>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Button variant="ghost" className="text-white" onClick={() => navigate('/')}>
                Beranda
              </Button>
              <Button variant="ghost" className="text-white" onClick={() => navigate('/profile')}>
                Profil
              </Button>
              <Button variant="ghost" className="text-white" onClick={() => navigate('/settings')}>
                Pengaturan
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 bg-[#f3f3f3] pt-20 px-4 pb-4">
        <div className="container mx-auto max-w-7xl">
          <div className="max-w-4xl mx-auto">
            {children}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#006400] text-white py-6">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="text-center md:flex md:justify-between md:items-center">
            <div>
              <h2 className="text-lg font-bold mb-1">Kedai SSH</h2>
              <p className="text-sm text-white/80">
                © {new Date().getFullYear()} Kedai SSH. All rights reserved.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <nav className="flex justify-center space-x-6">
                <a href="#" className="text-sm text-white/80 hover:text-white">Terms</a>
                <a href="#" className="text-sm text-white/80 hover:text-white">Privacy</a>
                <a href="#" className="text-sm text-white/80 hover:text-white">Contact</a>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PageLayout;
