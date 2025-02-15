
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface ServerCardProps {
  id: string;
  name: string;
  location: string;
  status: string;
  load: number;
}

const ServerCard = ({ id, name, location, status, load }: ServerCardProps) => {
  const navigate = useNavigate();

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
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Lokasi:</span>
              <span className="font-medium">{location}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Server Load:</span>
              <span className="font-medium">{load}%</span>
            </div>
            <Button 
              className="w-full mt-2 bg-[#006400] hover:bg-[#006400]/90" 
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
