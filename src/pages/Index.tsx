
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Menu, User, Wallet, Network, CircleDot } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Index = () => {
  const navigate = useNavigate();

  return (
    <PageLayout>
      {/* Top Navigation */}
      <div className="flex justify-between items-center mb-6">
        <div /> {/* Empty div for spacing */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="mr-2">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="py-4">
              <nav className="space-y-2">
                <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/')}>
                  Beranda
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/profile')}>
                  Profil
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/settings')}>
                  Pengaturan
                </Button>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>

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
              <p className="text-lg font-bold text-white truncate">MEMBER</p>
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
          <span className="text-4xl font-bold mb-2">4</span>
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
          <span className="text-4xl font-bold mb-2">9</span>
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
          <span className="text-4xl font-bold mb-2">9</span>
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
          <span className="text-4xl font-bold mb-2">9</span>
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
