
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { User, Wallet, Network, CircleDot } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

interface ServerCounts {
  ssh: number;
  vmess: number;
  vless: number;
  trojan: number;
}

interface MonitoringEntry {
  id: string;
  account_type: string;
  masked_username: string;
  server_name: string;
  server_location: string;
  created_at: string;
}

const Index = () => {
  const navigate = useNavigate();
  const [serverCounts, setServerCounts] = useState<ServerCounts>({
    ssh: 0,
    vmess: 0,
    vless: 0,
    trojan: 0
  });
  const [monitoringData, setMonitoringData] = useState<MonitoringEntry[]>([]);

  useEffect(() => {
    const fetchServers = async () => {
      try {
        const { data, error } = await supabase
          .from('servers')
          .select('id, name');
        
        if (error) throw error;
        
        const counts = (data || []).reduce((acc, server) => {
          const name = server.name.toLowerCase();
          if (name.includes('ssh')) acc.ssh++;
          if (name.includes('vmess')) acc.vmess++;
          if (name.includes('vless')) acc.vless++;
          if (name.includes('trojan')) acc.trojan++;
          return acc;
        }, { ssh: 0, vmess: 0, vless: 0, trojan: 0 });

        setServerCounts(counts);
      } catch (error) {
        console.error('Error fetching servers:', error);
      }
    };

    const fetchMonitoringData = async () => {
      try {
        const { data, error } = await supabase
          .from('monitoring_view')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10);

        if (error) throw error;
        setMonitoringData(data || []);
      } catch (error) {
        console.error('Error fetching monitoring data:', error);
      }
    };

    fetchServers();
    fetchMonitoringData();

    // Set up real-time subscription
    const channel = supabase
      .channel('monitoring-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'monitoring_view'
        },
        (payload) => {
          fetchMonitoringData(); // Refresh data when changes occur
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <PageLayout>
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* User Info Cards */}
        <Card className="bg-[#006400]">
          <CardContent className="p-4 flex items-center space-x-3">
            <div className="bg-yellow-400 p-2 rounded-lg">
              <User className="h-6 w-6 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white">Role</p>
              <p className="text-base font-bold text-white truncate">MEMBER</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#006400]">
          <CardContent className="p-4 flex items-center space-x-3">
            <div className="bg-blue-500 p-2 rounded-lg">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Balance</p>
              <p className="text-base font-bold text-white">Rp 0</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#006400]">
          <CardContent className="p-4 flex items-center space-x-3">
            <div className="bg-green-500 p-2 rounded-lg">
              <Network className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">VPN Active</p>
              <p className="text-base font-bold text-white">0</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Server Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Button 
          variant="secondary" 
          className="h-auto py-6 flex flex-col items-center bg-[#006400] hover:bg-[#006400]/90 text-white"
          onClick={() => navigate('/ssh')}
        >
          <span className="text-3xl font-bold">{serverCounts.ssh}</span>
          <span className="text-sm mt-1">SSH Servers</span>
          <span className="text-sm flex items-center mt-1">
            Order SSH <CircleDot className="ml-1.5 h-4 w-4" />
          </span>
        </Button>

        <Button 
          variant="secondary" 
          className="h-auto py-6 flex flex-col items-center bg-[#006400] hover:bg-[#006400]/90 text-white"
          onClick={() => navigate('/vmess')}
        >
          <span className="text-3xl font-bold">{serverCounts.vmess}</span>
          <span className="text-sm mt-1">Vmess Servers</span>
          <span className="text-sm flex items-center mt-1">
            Order Vmess <CircleDot className="ml-1.5 h-4 w-4" />
          </span>
        </Button>

        <Button 
          variant="secondary" 
          className="h-auto py-6 flex flex-col items-center bg-[#006400] hover:bg-[#006400]/90 text-white"
          onClick={() => navigate('/vless')}
        >
          <span className="text-3xl font-bold">{serverCounts.vless}</span>
          <span className="text-sm mt-1">Vless Servers</span>
          <span className="text-sm flex items-center mt-1">
            Order Vless <CircleDot className="ml-1.5 h-4 w-4" />
          </span>
        </Button>

        <Button 
          variant="secondary" 
          className="h-auto py-6 flex flex-col items-center bg-[#006400] hover:bg-[#006400]/90 text-white"
          onClick={() => navigate('/trojan')}
        >
          <span className="text-3xl font-bold">{serverCounts.trojan}</span>
          <span className="text-sm mt-1">Trojan Servers</span>
          <span className="text-sm flex items-center mt-1">
            Order Trojan <CircleDot className="ml-1.5 h-4 w-4" />
          </span>
        </Button>
      </div>

      {/* Monitoring Table */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Recent Activities</h3>
        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-sm">Type</TableHead>
                <TableHead className="text-sm">Username</TableHead>
                <TableHead className="text-sm">Details</TableHead>
                <TableHead className="text-sm">Price</TableHead>
                <TableHead className="text-sm">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {monitoringData.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="text-sm font-medium">{entry.account_type}</TableCell>
                  <TableCell className="text-sm">{entry.masked_username}</TableCell>
                  <TableCell className="text-sm">{entry.server_name}</TableCell>
                  <TableCell className="text-sm">{entry.server_location}</TableCell>
                  <TableCell className="text-sm">
                    {format(new Date(entry.created_at), 'HH:mm dd/MM')}
                  </TableCell>
                </TableRow>
              ))}
              {monitoringData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-sm text-gray-500">
                    No recent activities
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Index;
