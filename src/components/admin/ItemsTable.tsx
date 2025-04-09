import React, { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, PlusCircle, Save, Trash2, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

interface Item {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
}

const ItemsTable = () => {
  const { toast } = useToast();
  // Sample menu item data
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: "Butter Chicken Curry", category: "Main Course", price: 220, stock: 15, status: "available" },
    { id: 2, name: "Vegetable Biryani", category: "Rice", price: 180, stock: 20, status: "available" },
    { id: 3, name: "Paneer Tikka", category: "Appetizer", price: 150, stock: 0, status: "out of stock" },
    { id: 4, name: "Garlic Naan", category: "Bread", price: 40, stock: 25, status: "available" },
    { id: 5, name: "Flaky Paratha Bread", category: "Bread", price: 35, stock: 18, status: "available" }
  ]);

  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [newItem, setNewItem] = useState(false);
  const [formData, setFormData] = useState<Item>({
    id: 0,
    name: "",
    category: "",
    price: 0,
    stock: 0,
    status: "available"
  });

  const categories = ["Main Course", "Rice", "Appetizer", "Bread", "Dessert", "Beverage"];

  const handleEdit = (item: Item) => {
    setEditingItem(item);
    setFormData(item);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" || name === "stock" ? Number(value) : value
    });
  };

  const handleSelectChange = (value: string, field: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSave = () => {
    // Validate form data
    if (!formData.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Item name cannot be empty",
        variant: "destructive"
      });
      return;
    }

    if (formData.price <= 0) {
      toast({
        title: "Validation Error",
        description: "Price must be greater than 0",
        variant: "destructive"
      });
      return;
    }

    if (formData.stock < 0) {
      toast({
        title: "Validation Error",
        description: "Stock cannot be negative",
        variant: "destructive"
      });
      return;
    }

    if (newItem) {
      // Add new item
      const newItemWithId = {
        ...formData,
        id: items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1
      };
      setItems([...items, newItemWithId]);
      toast({
        title: "Item Added",
        description: `${newItemWithId.name} has been added to the menu.`,
      });
    } else {
      // Update existing item
      setItems(items.map(item => item.id === formData.id ? formData : item));
      toast({
        title: "Item Updated",
        description: `${formData.name} has been updated.`,
      });
    }
    setEditingItem(null);
    setNewItem(false);
  };

  const handleDelete = (id: number) => {
    const itemToDelete = items.find(item => item.id === id);
    if (itemToDelete) {
      setItems(items.filter(item => item.id !== id));
      toast({
        title: "Item Deleted",
        description: `${itemToDelete.name} has been removed from the menu.`,
        variant: "destructive"
      });
    }
  };

  const handleAddNew = () => {
    setNewItem(true);
    setFormData({
      id: 0,
      name: "",
      category: "Main Course",
      price: 0,
      stock: 0,
      status: "available"
    });
  };

  const handleCancel = () => {
    setEditingItem(null);
    setNewItem(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Menu Items</h2>
        <Button 
          size="sm" 
          className="bg-amber-600 hover:bg-amber-700 gap-2"
          onClick={handleAddNew}
        >
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
          {newItem && (
            <TableRow>
              <TableCell className="font-medium">New</TableCell>
              <TableCell>
                <Input 
                  value={formData.name} 
                  name="name" 
                  onChange={handleChange} 
                  placeholder="Item name"
                  required
                />
              </TableCell>
              <TableCell>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => handleSelectChange(value, "category")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="text-right">
                <Input 
                  type="number" 
                  value={formData.price} 
                  name="price" 
                  onChange={handleChange}
                  min={1}
                  className="text-right"
                  required
                />
              </TableCell>
              <TableCell>
                <Input 
                  type="number" 
                  value={formData.stock} 
                  name="stock" 
                  onChange={handleChange}
                  min={0}
                  className="text-center"
                  required
                />
              </TableCell>
              <TableCell>
                <Select 
                  value={formData.status} 
                  onValueChange={(value) => handleSelectChange(value, "status")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="out of stock">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="default" size="icon" onClick={handleSave} className="bg-green-500 hover:bg-green-600">
                    <Save className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="icon" onClick={handleCancel}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )}
          
          {items.map((item) => (
            <TableRow key={item.id}>
              {editingItem?.id === item.id ? (
                <>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>
                    <Input 
                      value={formData.name} 
                      name="name" 
                      onChange={handleChange} 
                      required
                    />
                  </TableCell>
                  <TableCell>
                    <Select 
                      value={formData.category} 
                      onValueChange={(value) => handleSelectChange(value, "category")}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right">
                    <Input 
                      type="number" 
                      value={formData.price} 
                      name="price" 
                      onChange={handleChange}
                      min={1}
                      className="text-right"
                      required
                    />
                  </TableCell>
                  <TableCell>
                    <Input 
                      type="number" 
                      value={formData.stock} 
                      name="stock" 
                      onChange={handleChange}
                      min={0}
                      className="text-center"
                      required
                    />
                  </TableCell>
                  <TableCell>
                    <Select 
                      value={formData.status} 
                      onValueChange={(value) => handleSelectChange(value, "status")}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="out of stock">Out of Stock</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="default" size="icon" onClick={handleSave} className="bg-green-500 hover:bg-green-600">
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="icon" onClick={handleCancel}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell className="text-right">₹{item.price}</TableCell>
                  <TableCell className="text-center">{item.stock}</TableCell>
                  <TableCell>
                    <Badge variant={item.status === "available" ? "outline" : "secondary"} className={item.status === "available" ? "bg-green-500 text-white" : "bg-red-100 text-red-800"}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ItemsTable;
