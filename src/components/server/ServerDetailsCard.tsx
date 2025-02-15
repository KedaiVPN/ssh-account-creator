
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ServerDetailsProps {
  server: {
    name: string;
    hostname: string;
    load: number;
    location: string;
    status: string;
    max_users: number;
  };
}

const ServerDetailsCard = ({ server }: ServerDetailsProps) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Informasi Server</CardTitle>
        <CardDescription>Detail server yang dipilih</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-muted/50">
              <Label className="text-sm text-muted-foreground">Nama Server</Label>
              <p className="text-lg font-medium mt-1">{server.name}</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <Label className="text-sm text-muted-foreground">Hostname</Label>
              <p className="text-lg font-medium mt-1">{server.hostname}</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <Label className="text-sm text-muted-foreground">Server Load</Label>
              <div className="flex items-center space-x-2 mt-1">
                <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-success transition-all duration-500" 
                    style={{ width: `${server.load}%` }}
                  />
                </div>
                <span className="text-lg font-medium">{server.load}%</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-muted/50">
              <Label className="text-sm text-muted-foreground">Lokasi</Label>
              <p className="text-lg font-medium mt-1">{server.location}</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <Label className="text-sm text-muted-foreground">Status</Label>
              <p className={`text-lg font-medium mt-1 ${
                server.status === 'online' ? 'text-success' : 'text-error'
              }`}>
                {server.status.toUpperCase()}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <Label className="text-sm text-muted-foreground">Max Users</Label>
              <p className="text-lg font-medium mt-1">{server.max_users}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServerDetailsCard;
