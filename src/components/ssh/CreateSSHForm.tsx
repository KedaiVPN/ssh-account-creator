
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
import { Loader2, Copy, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SSHAccount, copyToClipboard, generateRandomPassword } from "@/lib/utils/ssh-utils";
import { sshAccountSchema } from "@/lib/validators/ssh";

interface CreateSSHFormProps {
  onSubmit: (username: string, password: string) => Promise<void>;
  isLoading: boolean;
  createdAccount: SSHAccount | null;
  onCloseDetails: () => void;
}

const CreateSSHForm = ({ onSubmit, isLoading, createdAccount, onCloseDetails }: CreateSSHFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { toast } = useToast();

  const validateForm = () => {
    try {
      sshAccountSchema.parse({ username, password });
      setErrors({});
      return true;
    } catch (error: any) {
      const newErrors: { [key: string]: string } = {};
      error.errors.forEach((err: any) => {
        const field = err.path[0];
        newErrors[field] = err.message;
      });
      setErrors(newErrors);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    await onSubmit(username, password);
  };

  const handleGeneratePassword = () => {
    const newPassword = generateRandomPassword();
    setPassword(newPassword);
    setErrors((prev) => ({ ...prev, password: "" }));
  };

  const handleClose = () => {
    setUsername("");
    setPassword("");
    setErrors({});
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
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (errors.username) {
                    setErrors((prev) => ({ ...prev, username: "" }));
                  }
                }}
                required
                disabled={isLoading}
                className={errors.username ? "border-destructive" : ""}
              />
              {errors.username && (
                <p className="text-sm text-destructive">{errors.username}</p>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleGeneratePassword}
                  disabled={isLoading}
                  className="h-8 px-2"
                >
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Generate
                </Button>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) {
                    setErrors((prev) => ({ ...prev, password: "" }));
                  }
                }}
                required
                disabled={isLoading}
                className={errors.password ? "border-destructive" : ""}
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>
            <Button 
              type="submit" 
              className="w-full bg-[#006400] hover:bg-[#006400]/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Membuat Akun...
                </>
              ) : (
                "Buat Akun SSH"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Dialog open={!!createdAccount} onOpenChange={(open) => !open && handleClose()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detail Akun SSH</DialogTitle>
            <DialogDescription>
              Berikut adalah detail akun SSH yang baru dibuat. Harap simpan informasi ini dengan aman.
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
