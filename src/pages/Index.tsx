
import { motion } from "framer-motion";
import ServerCard from "@/components/ServerCard";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Server {
  id: string;
  name: string;
  location: string;
  status: string;
  load: number;
}

const Index = () => {
  const [servers, setServers] = useState<Server[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-center mb-2">SSH Creator</h1>
          <p className="text-muted-foreground text-center mb-8">
            Buat akun SSH dengan mudah dan cepat
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {servers.map((server) => (
            <ServerCard 
              key={server.id} 
              {...server}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 text-center text-sm text-muted-foreground"
        >
          <p>
            Dengan menggunakan layanan ini, Anda menyetujui syarat dan ketentuan
            yang berlaku
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
