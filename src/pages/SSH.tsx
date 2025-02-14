
import { motion } from "framer-motion";
import ServerCard from "@/components/ServerCard";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Server {
  id: string;
  name: string;
  location: string;
  status: string;
  load: number;
}

const SSH = () => {
  const [servers, setServers] = useState<Server[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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
      <header className="bg-[#006400] text-white py-6">
        <div className="container px-4">
          <h1 className="text-3xl font-bold text-center">Kedai SSH</h1>
          <p className="text-center mt-2 text-white/80">the fastest speed server</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-[#f0f8f0]">
        <div className="container px-4 py-8">
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => navigate('/')}
          >
            ← Kembali
          </Button>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-center mb-8">Pilih Server SSH</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {servers.map((server) => (
                <ServerCard 
                  key={server.id} 
                  {...server}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#006400] text-white py-6">
        <div className="container px-4">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">Kedai SSH</h2>
            <p className="text-sm text-white/80">
              © {new Date().getFullYear()} Kedai SSH. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SSH;
