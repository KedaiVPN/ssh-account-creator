
import { motion, useScroll, useTransform } from "framer-motion";
import ServerCard from "@/components/ServerCard";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Server {
  id: string;
  name: string;
  location: string;
  status: string;
  load: number;
}

const ServiceCard = ({ 
  title, 
  description, 
  servers, 
  isAvailable = true,
  onSelect 
}: { 
  title: string;
  description: string;
  servers: Server[];
  isAvailable?: boolean;
  onSelect: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Status:</span>
            <span className={`text-sm ${isAvailable ? 'text-success' : 'text-error'}`}>
              {isAvailable ? 'Tersedia' : 'Segera Hadir'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Server Tersedia:</span>
            <span className="text-sm font-medium">{servers.length}</span>
          </div>
        </div>
        <Button 
          className="w-full" 
          onClick={onSelect}
          disabled={!isAvailable}
        >
          Create Account
        </Button>
      </CardContent>
    </Card>
  </motion.div>
);

const Index = () => {
  const [servers, setServers] = useState<Server[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [show, setShow] = useState(true);
  const navigate = useNavigate();

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY && window.scrollY > 100) { // scroll down
        setShow(false);
      } else { // scroll up
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

  const fetchServers = async () => {
    try {
      const { data, error } = await supabase
        .from('servers')
        .select('id, name, location, status, load');
      
      if (error) throw error;
      setServers(data || []);
    } catch (error) {
      console.error('Error fetching servers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServers();
  }, []);

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
      <main className="flex-1 bg-[#f0f8f0] pt-20">
        <div className="container px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <ServiceCard
                title="SSH Account"
                description="Akses SSH untuk kebutuhan tunneling dengan performa terbaik"
                servers={servers}
                onSelect={() => navigate('/ssh')}
              />
              <ServiceCard
                title="V2Ray VMess"
                description="Layanan V2Ray VMess untuk koneksi yang lebih aman"
                servers={[]}
                isAvailable={false}
                onSelect={() => {}}
              />
              <ServiceCard
                title="Trojan"
                description="Protokol Trojan untuk bypass firewall"
                servers={[]}
                isAvailable={false}
                onSelect={() => {}}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center text-sm text-muted-foreground"
          >
            <p>
              Dengan menggunakan layanan ini, Anda menyetujui syarat dan ketentuan
              yang berlaku
            </p>
          </motion.div>
        </div>
      </main>

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

export default Index;
