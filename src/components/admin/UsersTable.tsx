
import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const UsersTable = () => {
  // Sample user data
  const users = [
    { id: 1, name: "John Doe", phone: "+91 9876543210", orders: 5, status: "active" },
    { id: 2, name: "Jane Smith", phone: "+91 9876543211", orders: 3, status: "active" },
    { id: 3, name: "Bob Johnson", phone: "+91 9876543212", orders: 0, status: "inactive" },
    { id: 4, name: "Alice Brown", phone: "+91 9876543213", orders: 2, status: "active" },
    { id: 5, name: "Charlie Wilson", phone: "+91 9876543214", orders: 1, status: "active" }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Users</h2>
        <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
          Add User
        </Button>
      </div>
      
      <Table>
        <TableCaption>A list of all registered users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead className="text-center">Orders</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell className="text-center">{user.orders}</TableCell>
              <TableCell>
                <Badge variant={user.status === "active" ? "default" : "secondary"} className={user.status === "active" ? "bg-green-500" : "bg-gray-400"}>
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersTable;
