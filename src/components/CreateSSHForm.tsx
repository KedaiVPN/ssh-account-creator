
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
import { useState } from "react";
import { motion } from "framer-motion";

interface CreateSSHFormProps {
  serverId: string | null;
  onSuccess: () => void;
}

const CreateSSHForm = ({ serverId, onSuccess }: CreateSSHFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serverId) {
      toast({
        title: "Error",
        description: "Silakan pilih server terlebih dahulu",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Convert Date to ISO string format that Supabase expects
      const expiryDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
      
      const { error } = await supabase
        .from('ssh_accounts')
        .insert({
          server_id: serverId,
          username,
          password,
          expired_at: expiryDate,
        });

      if (error) throw error;

      toast({
        title: "Berhasil",
        description: "Akun SSH telah berhasil dibuat",
      });
      
      setUsername("");
      setPassword("");
      onSuccess();
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <Card className="w-full max-w-md mx-auto">
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
              disabled={isLoading || !serverId}
            >
              {isLoading ? "Membuat Akun..." : "Buat Akun SSH"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CreateSSHForm;
