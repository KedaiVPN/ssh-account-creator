
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

interface CreateSSHFormProps {
  onSubmit: (username: string, password: string) => Promise<void>;
  isLoading: boolean;
}

const CreateSSHForm = ({ onSubmit, isLoading }: CreateSSHFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(username, password);
  };

  return (
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
  );
};

export default CreateSSHForm;
