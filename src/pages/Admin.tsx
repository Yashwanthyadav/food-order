
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminHeader from "@/components/admin/AdminHeader";
import UsersTable from "@/components/admin/UsersTable";
import OrdersTable from "@/components/admin/OrdersTable";
import ItemsTable from "@/components/admin/ItemsTable";
import CouponCodesTable from "@/components/admin/CouponCodesTable";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShieldAlert, DollarSign, BadgeIndianRupee } from "lucide-react";
import AdminLogin from "@/components/admin/AdminLogin";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activePage, setActivePage] = useState("orders");
  const navigate = useNavigate();

  const handleLogin = (success: boolean) => {
    setIsAuthenticated(success);
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-6 w-6 text-amber-600" />
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-amber-100 px-3 py-1 rounded-full">
              <BadgeIndianRupee className="h-4 w-4 text-amber-800" />
              <span className="text-amber-800 font-medium text-sm">INR Currency</span>
            </div>
            <Button variant="outline" onClick={() => navigate("/")}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Site
            </Button>
          </div>
        </div>

        <Tabs defaultValue="orders" className="w-full" value={activePage} onValueChange={setActivePage}>
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="items">Items</TabsTrigger>
            <TabsTrigger value="coupons">Coupons</TabsTrigger>
          </TabsList>
          
          <TabsContent value="orders" className="bg-white rounded-lg shadow p-6">
            <OrdersTable />
          </TabsContent>
          
          <TabsContent value="users" className="bg-white rounded-lg shadow p-6">
            <UsersTable />
          </TabsContent>
          
          <TabsContent value="items" className="bg-white rounded-lg shadow p-6">
            <ItemsTable />
          </TabsContent>
          
          <TabsContent value="coupons" className="bg-white rounded-lg shadow p-6">
            <CouponCodesTable />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
