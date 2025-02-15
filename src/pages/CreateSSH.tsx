
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

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Informasi Server</CardTitle>
                <CardDescription>Detail server yang dipilih</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-muted/50">
                      <Label className="text-sm text-muted-foreground">Nama Server</Label>
                      <p className="text-lg font-medium mt-1">{server.name}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <Label className="text-sm text-muted-foreground">Hostname</Label>
                      <p className="text-lg font-medium mt-1">{server.hostname}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <Label className="text-sm text-muted-foreground">Server Load</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-success transition-all duration-500" 
                            style={{ width: `${server.load}%` }}
                          />
                        </div>
                        <span className="text-lg font-medium">{server.load}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-muted/50">
                      <Label className="text-sm text-muted-foreground">Lokasi</Label>
                      <p className="text-lg font-medium mt-1">{server.location}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <Label className="text-sm text-muted-foreground">Status</Label>
                      <p className={`text-lg font-medium mt-1 ${
                        server.status === 'online' ? 'text-success' : 'text-error'
                      }`}>
                        {server.status.toUpperCase()}
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <Label className="text-sm text-muted-foreground">Max Users</Label>
                      <p className="text-lg font-medium mt-1">{server.max_users}</p>
                    </div>
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
                    className="w-full bg-[#006400] hover:bg-[#006400]/90"
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

export default CreateSSH;
