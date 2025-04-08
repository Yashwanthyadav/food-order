
import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, PlusCircle, Trash2 } from 'lucide-react';

const ItemsTable = () => {
  // Sample menu item data
  const items = [
    { id: 1, name: "Butter Chicken Curry", category: "Main Course", price: 220, stock: 15, status: "available" },
    { id: 2, name: "Vegetable Biryani", category: "Rice", price: 180, stock: 20, status: "available" },
    { id: 3, name: "Paneer Tikka", category: "Appetizer", price: 150, stock: 0, status: "out of stock" },
    { id: 4, name: "Garlic Naan", category: "Bread", price: 40, stock: 25, status: "available" },
    { id: 5, name: "Flaky Paratha Bread", category: "Bread", price: 35, stock: 18, status: "available" }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Menu Items</h2>
        <Button size="sm" className="bg-amber-600 hover:bg-amber-700 gap-2">
          <PlusCircle className="h-4 w-4" />
          Add Item
        </Button>
      </div>
      
      <Table>
        <TableCaption>A list of all menu items.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Price (₹)</TableHead>
            <TableHead className="text-center">Stock</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell className="text-right">{item.price}</TableCell>
              <TableCell className="text-center">{item.stock}</TableCell>
              <TableCell>
                <Badge variant={item.status === "available" ? "outline" : "secondary"} className={item.status === "available" ? "bg-green-500 text-white" : "bg-red-100 text-red-800"}>
                  {item.status}
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

export default ItemsTable;
