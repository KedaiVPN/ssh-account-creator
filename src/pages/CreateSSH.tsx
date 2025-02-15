
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ServerDetailsCard from "@/components/server/ServerDetailsCard";
import CreateSSHForm from "@/components/ssh/CreateSSHForm";
import PageLayout from "@/components/layout/PageLayout";

interface ServerDetails {
  id: string;
  name: string;
  location: string;
  status: string;
  load: number;
  max_users: number;
  hostname: string;
}

const CreateSSH = () => {
  const { serverId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [server, setServer] = useState<ServerDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchServerDetails = async () => {
      if (!serverId) {
        navigate(-1);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('servers')
          .select('*')
          .eq('id', serverId)
          .single();

        if (error) throw error;
        if (!data) {
          navigate(-1);
          return;
        }

        setServer(data);
      } catch (error) {
        console.error('Error fetching server details:', error);
        navigate(-1);
      }
    };

    fetchServerDetails();
  }, [serverId, navigate]);

  const handleCreateSSH = async (username: string, password: string) => {
    if (!server) return;

    setIsLoading(true);
    try {
      const expiryDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
      
      const { error } = await supabase
        .from('ssh_accounts')
        .insert({
          server_id: server.id,
          username,
          password,
          expired_at: expiryDate,
        });

      if (error) throw error;

      toast({
        title: "Berhasil",
        description: "Akun SSH telah berhasil dibuat",
      });
      
      navigate(-1);
    } catch (error) {
      console.error('Error creating SSH account:', error);
      toast({
        title: "Error",
        description: "Gagal membuat akun SSH. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!server) return null;

  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => navigate(-1)}
        >
          ← Kembali
        </Button>

        <ServerDetailsCard server={server} />
        <CreateSSHForm 
          onSubmit={handleCreateSSH}
          isLoading={isLoading}
        />
      </motion.div>
    </PageLayout>
  );
};

export default CreateSSH;
