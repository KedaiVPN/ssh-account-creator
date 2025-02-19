
/**
 * @file SSH utility functions
 * @description Kumpulan fungsi utilitas untuk manajemen akun SSH
 */

import { toast } from "@/hooks/use-toast";

export interface SSHAccount {
  username: string;
  password: string;
  server_hostname: string;
  server_port: number;
}

/**
 * Menyalin teks ke clipboard dengan feedback toast
 * @param text - Teks yang akan disalin
 */
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

/**
 * Generate password yang memenuhi kriteria keamanan
 * @param length - Panjang password yang diinginkan (default: 12)
 * @returns Password yang di-generate secara random
 */
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

/**
 * Format tanggal kedaluwarsa akun
 * @param days - Jumlah hari sampai kedaluwarsa (default: 30)
 * @returns Tanggal kedaluwarsa dalam format ISO string
 */
export const formatExpiryDate = (days: number = 30): string => {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
};
