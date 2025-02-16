
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
        <div className="container px-4">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white mr-4">
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
            <div className="flex-1 text-center">
              <h1 className="text-2xl font-bold">Kedai SSH</h1>
              <p className="text-sm text-white/80">the fastest speed server</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 bg-[#f3f3f3] pt-20 px-4 pb-4">
        <div className="container max-w-lg mx-auto">
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
