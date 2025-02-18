
import { z } from "zod";

export const sshAccountSchema = z.object({
  username: z
    .string()
    .min(3, "Username minimal 3 karakter")
    .max(32, "Username maksimal 32 karakter")
    .regex(/^[a-zA-Z0-9_-]+$/, "Username hanya boleh mengandung huruf, angka, underscore, dan dash"),
  password: z
    .string()
    .min(6, "Password minimal 6 karakter")
    .max(64, "Password maksimal 64 karakter")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{6,}$/,
      "Password harus mengandung minimal 1 huruf kecil, 1 huruf besar, dan 1 angka"
    ),
});

export type SSHAccountInput = z.infer<typeof sshAccountSchema>;
