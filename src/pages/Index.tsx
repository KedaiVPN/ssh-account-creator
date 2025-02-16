
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { User, Wallet, Network, CircleDot } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ServerCounts {
  ssh: number;
  vmess: number;
  vless: number;
  trojan: number;
}

const Index = () => {
  const navigate = useNavigate();
  const [serverCounts, setServerCounts] = useState<ServerCounts>({
    ssh: 0,
    vmess: 0,
    vless: 0,
    trojan: 0
  });

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

    fetchServers();
  }, []);

  return (
    <PageLayout>
      {/* User Info Cards */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <Card className="bg-[#006400]">
          <CardContent className="p-3 flex items-center space-x-2">
            <div className="bg-yellow-400 p-1.5 rounded-lg">
              <User className="h-5 w-5 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-white">Role</p>
              <p className="text-xs font-bold text-white truncate">MEMBER</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#006400]">
          <CardContent className="p-3 flex items-center space-x-2">
            <div className="bg-blue-500 p-1.5 rounded-lg">
              <Wallet className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium text-white">Balance</p>
              <p className="text-sm font-bold text-white">Rp 0</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* VPN Active Card */}
      <Card className="mb-4 bg-[#006400]">
        <CardContent className="p-3 flex items-center space-x-2">
          <div className="bg-green-500 p-1.5 rounded-lg">
            <Network className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-xs font-medium text-white">VPN Active</p>
            <p className="text-sm font-bold text-white">0</p>
          </div>
        </CardContent>
      </Card>

      {/* Server Cards */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <Button 
          variant="secondary" 
          className="h-auto py-4 flex flex-col items-center bg-[#006400] hover:bg-[#006400]/90 text-white"
          onClick={() => navigate('/ssh')}
        >
          <span className="text-2xl font-bold">{serverCounts.ssh}</span>
          <span className="text-xs">SSH Servers</span>
          <span className="text-xs flex items-center mt-0.5">
            Order SSH <CircleDot className="ml-1 h-3 w-3" />
          </span>
        </Button>
        <Button 
          variant="secondary" 
          className="h-auto py-4 flex flex-col items-center bg-[#006400] hover:bg-[#006400]/90 text-white"
          onClick={() => navigate('/vmess')}
        >
          <span className="text-2xl font-bold">{serverCounts.vmess}</span>
          <span className="text-xs">Vmess Servers</span>
          <span className="text-xs flex items-center mt-0.5">
            Order Vmess <CircleDot className="ml-1 h-3 w-3" />
          </span>
        </Button>
        <Button 
          variant="secondary" 
          className="h-auto py-4 flex flex-col items-center bg-[#006400] hover:bg-[#006400]/90 text-white"
          onClick={() => navigate('/vless')}
        >
          <span className="text-2xl font-bold">{serverCounts.vless}</span>
          <span className="text-xs">Vless Servers</span>
          <span className="text-xs flex items-center mt-0.5">
            Order Vless <CircleDot className="ml-1 h-3 w-3" />
          </span>
        </Button>
        <Button 
          variant="secondary" 
          className="h-auto py-4 flex flex-col items-center bg-[#006400] hover:bg-[#006400]/90 text-white"
          onClick={() => navigate('/trojan')}
        >
          <span className="text-2xl font-bold">{serverCounts.trojan}</span>
          <span className="text-xs">Trojan Servers</span>
          <span className="text-xs flex items-center mt-0.5">
            Order Trojan <CircleDot className="ml-1 h-3 w-3" />
          </span>
        </Button>
      </div>
    </PageLayout>
  );
};

export default Index;
