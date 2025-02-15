
import { motion } from "framer-motion";
import ServerCard from "@/components/ServerCard";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";

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
    <PageLayout>
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => navigate(-1)}
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
    </PageLayout>
  );
};

export default SSH;
