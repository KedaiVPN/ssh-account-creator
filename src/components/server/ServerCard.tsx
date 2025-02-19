
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { SERVER_LOCATIONS } from "@/lib/types/server";
import { formatToRupiah, calculatePrice } from "@/lib/utils/price-utils";

interface ServerCardProps {
  id: string;
  name: string;
  location: string;
  status: string;
  load: number;
}

const ServerCard = ({ id, name, location, status, load }: ServerCardProps) => {
  const navigate = useNavigate();
  const [isMonthly, setIsMonthly] = useState(true);
  const [days, setDays] = useState<number>(1);

  const serverLocation = SERVER_LOCATIONS[location.toLowerCase()];
  const { daily: dailyPrice, monthly: monthlyPrice } = serverLocation?.prices || 
    SERVER_LOCATIONS.singapore.prices;

  const totalPrice = calculatePrice(dailyPrice, monthlyPrice, isMonthly, days);

  const handleDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0 && value <= 30) {
      setDays(value);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold">{name}</CardTitle>
          <Badge
            variant="outline"
            className={`${
              status === "online"
                ? "bg-success/10 text-success border-success"
                : "bg-error/10 text-error border-error"
            }`}
          >
            {status}
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Lokasi:</span>
              <span className="font-medium">{location}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Server Load:</span>
              <span className="font-medium">{load}%</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="monthly"
                checked={isMonthly}
                onCheckedChange={(checked) => setIsMonthly(checked as boolean)}
              />
              <Label htmlFor="monthly">1 Bulan ({formatToRupiah(monthlyPrice)})</Label>
            </div>

            {!isMonthly && (
              <div className="space-y-2">
                <Label htmlFor="days">Jumlah Hari</Label>
                <Input
                  id="days"
                  type="number"
                  min="1"
                  max="30"
                  value={days}
                  onChange={handleDaysChange}
                  className="w-full"
                />
                <p className="text-sm text-muted-foreground">
                  {formatToRupiah(dailyPrice)}/hari
                </p>
              </div>
            )}

            <div className="space-y-2">
              <div className="flex justify-between font-medium">
                <span>Total:</span>
                <span>{formatToRupiah(totalPrice)}</span>
              </div>
              <p className="text-sm text-destructive font-medium">NO STB</p>
            </div>

            <Button 
              className="w-full bg-[#006400] hover:bg-[#006400]/90" 
              onClick={() => navigate(`/create-ssh/${id}`)}
              disabled={status !== "online"}
            >
              Pilih Server
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ServerCard;
