
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchServerDetails = async () => {
      if (!serverId) {
        navigate('/');
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
          navigate('/');
          return;
        }

        setServer(data);
      } catch (error) {
        console.error('Error fetching server details:', error);
        navigate('/');
      }
    };

    fetchServerDetails();
  }, [serverId, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      
      navigate('/');
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
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => navigate('/')}
          >
            ← Kembali
          </Button>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Informasi Server</CardTitle>
              <CardDescription>Detail server yang dipilih</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Nama Server</Label>
                  <p className="text-foreground">{server.name}</p>
                </div>
                <div className="text-right">
                  <Label>Lokasi</Label>
                  <p className="text-foreground">{server.location}</p>
                </div>
                <div>
                  <Label>Hostname</Label>
                  <p className="text-foreground">{server.hostname}</p>
                </div>
                <div className="text-right">
                  <Label>Status</Label>
                  <p className={`text-foreground capitalize ${
                    server.status === 'online' ? 'text-success' : 'text-error'
                  }`}>
                    {server.status}
                  </p>
                </div>
                <div>
                  <Label>Server Load</Label>
                  <p className="text-foreground">{server.load}%</p>
                </div>
                <div className="text-right">
                  <Label>Max Users</Label>
                  <p className="text-foreground">{server.max_users}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Buat Akun SSH</CardTitle>
              <CardDescription>
                Masukkan username dan password untuk membuat akun SSH baru
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="Masukkan username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Masukkan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Membuat Akun..." : "Buat Akun SSH"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateSSH;
