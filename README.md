
# SSH Account Creator

Aplikasi web untuk manajemen dan pembuatan akun SSH dengan antarmuka yang intuitif.

## Fitur Utama

- 🔐 Pembuatan akun SSH dengan validasi yang kuat
- 🎨 Antarmuka pengguna modern dengan Tailwind CSS dan shadcn/ui
- 📋 Clipboard integration untuk menyalin detail akun
- 🔄 Generator password otomatis
- 🔒 Integrasi dengan Supabase untuk penyimpanan data yang aman

## Tech Stack

- **Frontend**: React + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Backend**: Supabase
- **State Management**: React Query
- **Form Validation**: Zod

## Setup Pengembangan

1. Clone repositori
```bash
git clone <repository-url>
cd ssh-account-creator
```

2. Install dependensi
```bash
npm install
```

3. Jalankan aplikasi
```bash
npm run dev
```

## Struktur Proyek

```
src/
├── components/        # Komponen React yang reusable
│   ├── ui/           # Komponen UI dasar dari shadcn/ui
│   └── ssh/          # Komponen khusus untuk fitur SSH
├── lib/              # Utilitas dan helper functions
│   ├── utils/        # Fungsi utilitas umum
│   └── validators/   # Schema validasi
├── pages/            # Komponen halaman
└── integrations/     # Konfigurasi integrasi third-party
```

## Best Practices

- Gunakan TypeScript untuk type safety
- Ikuti konvensi penamaan yang konsisten
- Validasi input menggunakan Zod
- Gunakan komponen shadcn/ui untuk konsistensi UI
- Implementasikan error handling yang proper
- Dokumentasikan kode dengan JSDoc

## Deployment

Aplikasi dapat di-deploy menggunakan platform seperti Vercel, Netlify, atau layanan hosting lainnya yang mendukung aplikasi React.

## Kontribusi

1. Fork repositori
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## Lisensi

Distributed under the MIT License. See `LICENSE` for more information.
