
import { motion } from "framer-motion";
import ServerCard from "@/components/ServerCard";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-[#006400] text-white py-6">
        <div className="container px-4">
          <h1 className="text-3xl font-bold text-center">Kedai SSH</h1>
          <p className="text-center mt-2 text-white/80">the fastest speed server</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-background">
        <div className="container px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Tabs defaultValue="ssh" className="w-full">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
                <TabsTrigger value="ssh">SSH Account</TabsTrigger>
                <TabsTrigger value="vmess">V2Ray VMess</TabsTrigger>
                <TabsTrigger value="vless">V2Ray VLess</TabsTrigger>
                <TabsTrigger value="trojan">Trojan</TabsTrigger>
              </TabsList>
              <TabsContent value="ssh" className="mt-6">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {servers.map((server) => (
                    <ServerCard 
                      key={server.id} 
                      {...server}
                    />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="vmess">
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">V2Ray VMess</h3>
                  <p className="text-muted-foreground">Layanan akan segera tersedia</p>
                </div>
              </TabsContent>
              <TabsContent value="vless">
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">V2Ray VLess</h3>
                  <p className="text-muted-foreground">Layanan akan segera tersedia</p>
                </div>
              </TabsContent>
              <TabsContent value="trojan">
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">Trojan</h3>
                  <p className="text-muted-foreground">Layanan akan segera tersedia</p>
                </div>
              </TabsContent>
            </Tabs>
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

export default Index;
