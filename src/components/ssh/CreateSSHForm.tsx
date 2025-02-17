
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
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CreateSSHFormProps {
  onSubmit: (username: string, password: string) => Promise<void>;
  isLoading: boolean;
  createdAccount: {
    username: string;
    password: string;
    server_hostname: string;
    server_port: number;
  } | null;
  onCloseDetails: () => void;
}

const CreateSSHForm = ({ onSubmit, isLoading, createdAccount, onCloseDetails }: CreateSSHFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(username, password);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      description: "Berhasil disalin ke clipboard",
    });
  };

  const handleClose = () => {
    setUsername("");
    setPassword("");
    onCloseDetails();
  };

  return (
    <>
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

      <Dialog open={!!createdAccount} onOpenChange={(open) => !open && handleClose()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detail Akun SSH</DialogTitle>
            <DialogDescription>
              Berikut adalah detail akun SSH yang baru dibuat
            </DialogDescription>
          </DialogHeader>
          {createdAccount && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Host</Label>
                <div className="flex items-center space-x-2">
                  <Input value={createdAccount.server_hostname} readOnly />
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => copyToClipboard(createdAccount.server_hostname)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Port</Label>
                <div className="flex items-center space-x-2">
                  <Input value={createdAccount.server_port} readOnly />
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => copyToClipboard(createdAccount.server_port.toString())}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Username</Label>
                <div className="flex items-center space-x-2">
                  <Input value={createdAccount.username} readOnly />
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => copyToClipboard(createdAccount.username)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <div className="flex items-center space-x-2">
                  <Input value={createdAccount.password} readOnly />
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => copyToClipboard(createdAccount.password)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleClose} className="w-full">
              Tutup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateSSHForm;
