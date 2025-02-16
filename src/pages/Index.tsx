
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
        
        // Count servers by type based on name
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
      {/* Telegram Alert */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border-l-4 border-red-500">
        <p className="text-gray-800">
          Semua informasi diperbarui melalui grup telegram. Silahkan join{" "}
          <a href="#" className="text-blue-600 font-semibold">DISINI</a>
        </p>
      </div>

      {/* User Info Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
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
              <p className="text-lg font-bold text-white">Rp 0</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* VPN Active Card */}
      <Card className="mb-6 bg-[#006400]">
        <CardContent className="p-4 flex items-center space-x-3">
          <div className="bg-green-500 p-2 rounded-lg">
            <Network className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">VPN Active</p>
            <p className="text-lg font-bold text-white">0</p>
          </div>
        </CardContent>
      </Card>

      {/* Server Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Button 
          variant="secondary" 
          className="h-auto py-6 flex flex-col items-center bg-[#006400] hover:bg-[#006400]/90 text-white"
          onClick={() => navigate('/ssh')}
        >
          <span className="text-4xl font-bold mb-2">{serverCounts.ssh}</span>
          <span className="text-sm mb-2">SSH Servers</span>
          <span className="text-sm flex items-center">
            Order SSH <CircleDot className="ml-1 h-4 w-4" />
          </span>
        </Button>
        <Button 
          variant="secondary" 
          className="h-auto py-6 flex flex-col items-center bg-[#006400] hover:bg-[#006400]/90 text-white"
          onClick={() => navigate('/vmess')}
        >
          <span className="text-4xl font-bold mb-2">{serverCounts.vmess}</span>
          <span className="text-sm mb-2">Vmess Servers</span>
          <span className="text-sm flex items-center">
            Order Vmess <CircleDot className="ml-1 h-4 w-4" />
          </span>
        </Button>
        <Button 
          variant="secondary" 
          className="h-auto py-6 flex flex-col items-center bg-[#006400] hover:bg-[#006400]/90 text-white"
          onClick={() => navigate('/vless')}
        >
          <span className="text-4xl font-bold mb-2">{serverCounts.vless}</span>
          <span className="text-sm mb-2">Vless Servers</span>
          <span className="text-sm flex items-center">
            Order Vless <CircleDot className="ml-1 h-4 w-4" />
          </span>
        </Button>
        <Button 
          variant="secondary" 
          className="h-auto py-6 flex flex-col items-center bg-[#006400] hover:bg-[#006400]/90 text-white"
          onClick={() => navigate('/trojan')}
        >
          <span className="text-4xl font-bold mb-2">{serverCounts.trojan}</span>
          <span className="text-sm mb-2">Trojan Servers</span>
          <span className="text-sm flex items-center">
            Order Trojan <CircleDot className="ml-1 h-4 w-4" />
          </span>
        </Button>
      </div>
    </PageLayout>
  );
};

export default Index;
