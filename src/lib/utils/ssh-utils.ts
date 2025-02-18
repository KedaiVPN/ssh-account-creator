
import { toast } from "@/hooks/use-toast";

export interface SSHAccount {
  username: string;
  password: string;
  server_hostname: string;
  server_port: number;
}

export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast({
      description: "Berhasil disalin ke clipboard",
    });
  } catch (error) {
    console.error("Failed to copy:", error);
    toast({
      variant: "destructive",
      description: "Gagal menyalin ke clipboard",
    });
  }
};

export const generateRandomPassword = (length: number = 12): string => {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const all = lowercase + uppercase + numbers;
  
  let password = '';
  
  // Ensure at least one of each required character type
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  
  // Fill the rest with random characters
  for (let i = password.length; i < length; i++) {
    password += all[Math.floor(Math.random() * all.length)];
  }
  
  // Shuffle the password
  return password.split('').sort(() => Math.random() - 0.5).join('');
};

export const formatExpiryDate = (days: number = 30): string => {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
};
