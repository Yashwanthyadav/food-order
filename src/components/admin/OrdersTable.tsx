
import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, FileText } from 'lucide-react';

const OrdersTable = () => {
  // Sample order data
  const orders = [
    { id: "ORD-001", customer: "John Doe", items: 3, total: 450, date: "2025-04-08", status: "delivered" },
    { id: "ORD-002", customer: "Jane Smith", items: 2, total: 280, date: "2025-04-08", status: "processing" },
    { id: "ORD-003", customer: "Bob Johnson", items: 1, total: 180, date: "2025-04-07", status: "cancelled" },
    { id: "ORD-004", customer: "Alice Brown", items: 4, total: 620, date: "2025-04-07", status: "delivered" },
    { id: "ORD-005", customer: "Charlie Wilson", items: 2, total: 320, date: "2025-04-06", status: "processing" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-500';
      case 'processing': return 'bg-amber-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Orders</h2>
        <Button size="sm" variant="outline" className="gap-2">
          <FileText className="h-4 w-4" />
          Export Report
        </Button>
      </div>
      
      <Table>
        <TableCaption>A list of all customer orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead className="text-center">Items</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell className="text-center">{order.items}</TableCell>
              <TableCell className="text-right">₹{order.total}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>
                <Badge variant="outline" className={`${getStatusColor(order.status)} text-white`}>
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdersTable;
