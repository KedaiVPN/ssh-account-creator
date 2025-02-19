
/**
 * Format angka ke format rupiah
 */
export const formatToRupiah = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

/**
 * Hitung total harga berdasarkan durasi
 */
export const calculatePrice = (
  dailyPrice: number,
  monthlyPrice: number,
  isMonthly: boolean,
  days?: number
): number => {
  if (isMonthly) {
    return monthlyPrice;
  }
  return (days || 1) * dailyPrice;
};
