
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
}

interface AccountDetails {
  username: string;
  password: string;
  host: string;
  port: number;
}

const CreateSSHForm = ({ onSubmit, isLoading }: CreateSSHFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [accountDetails, setAccountDetails] = useState<AccountDetails | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(username, password);
    
    // Simulate account details for demonstration
    // In real implementation, this should come from the onSubmit response
    setAccountDetails({
      username: username,
      password: password,
      host: "your-vps-ip", // This should come from server
      port: 22 // This should come from server
    });
    setShowDetails(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      description: "Berhasil disalin ke clipboard",
    });
  };

  const handleClose = () => {
    setShowDetails(false);
    setUsername("");
    setPassword("");
    setAccountDetails(null);
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

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detail Akun SSH</DialogTitle>
            <DialogDescription>
              Berikut adalah detail akun SSH yang baru dibuat
            </DialogDescription>
          </DialogHeader>
          {accountDetails && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Host</Label>
                <div className="flex items-center space-x-2">
                  <Input value={accountDetails.host} readOnly />
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => copyToClipboard(accountDetails.host)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Port</Label>
                <div className="flex items-center space-x-2">
                  <Input value={accountDetails.port} readOnly />
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => copyToClipboard(accountDetails.port.toString())}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Username</Label>
                <div className="flex items-center space-x-2">
                  <Input value={accountDetails.username} readOnly />
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => copyToClipboard(accountDetails.username)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <div className="flex items-center space-x-2">
                  <Input value={accountDetails.password} readOnly />
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => copyToClipboard(accountDetails.password)}
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
