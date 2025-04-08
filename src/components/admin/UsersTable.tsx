
import React, { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Save, Trash2, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

interface User {
  id: number;
  name: string;
  phone: string;
  orders: number;
  status: string;
}

const UsersTable = () => {
  const { toast } = useToast();
  // Sample user data
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "John Doe", phone: "+91 9876543210", orders: 5, status: "active" },
    { id: 2, name: "Jane Smith", phone: "+91 9876543211", orders: 3, status: "active" },
    { id: 3, name: "Bob Johnson", phone: "+91 9876543212", orders: 0, status: "inactive" },
    { id: 4, name: "Alice Brown", phone: "+91 9876543213", orders: 2, status: "active" },
    { id: 5, name: "Charlie Wilson", phone: "+91 9876543214", orders: 1, status: "active" }
  ]);

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState(false);
  const [formData, setFormData] = useState<User>({
    id: 0,
    name: "",
    phone: "",
    orders: 0,
    status: "active"
  });

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData(user);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "orders" ? Number(value) : value
    });
  };

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      status: value
    });
  };

  const handleSave = () => {
    if (newUser) {
      // Add new user
      const newUserWithId = {
        ...formData,
        id: users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1,
        orders: 0
      };
      setUsers([...users, newUserWithId]);
      toast({
        title: "User Added",
        description: `${newUserWithId.name} has been added to the system.`,
      });
    } else {
      // Update existing user
      setUsers(users.map(user => user.id === formData.id ? formData : user));
      toast({
        title: "User Updated",
        description: `${formData.name}'s information has been updated.`,
      });
    }
    setEditingUser(null);
    setNewUser(false);
  };

  const handleDelete = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
    toast({
      title: "User Deleted",
      description: "The user has been removed from the system.",
      variant: "destructive"
    });
  };

  const handleAddNew = () => {
    setNewUser(true);
    setFormData({
      id: 0,
      name: "",
      phone: "+91 ",
      orders: 0,
      status: "active"
    });
  };

  const handleCancel = () => {
    setEditingUser(null);
    setNewUser(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Users</h2>
        <Button size="sm" className="bg-amber-600 hover:bg-amber-700" onClick={handleAddNew}>
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
          {newUser && (
            <TableRow>
              <TableCell className="font-medium">New</TableCell>
              <TableCell>
                <Input 
                  value={formData.name} 
                  name="name" 
                  onChange={handleChange} 
                  placeholder="User name"
                />
              </TableCell>
              <TableCell>
                <Input 
                  value={formData.phone} 
                  name="phone" 
                  onChange={handleChange} 
                  placeholder="Phone number"
                />
              </TableCell>
              <TableCell className="text-center">0</TableCell>
              <TableCell>
                <Select 
                  value={formData.status} 
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
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
          {users.map((user) => (
            <TableRow key={user.id}>
              {editingUser?.id === user.id ? (
                <>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>
                    <Input 
                      value={formData.name} 
                      name="name" 
                      onChange={handleChange} 
                    />
                  </TableCell>
                  <TableCell>
                    <Input 
                      value={formData.phone} 
                      name="phone" 
                      onChange={handleChange} 
                    />
                  </TableCell>
                  <TableCell className="text-center">{user.orders}</TableCell>
                  <TableCell>
                    <Select 
                      value={formData.status} 
                      onValueChange={handleSelectChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
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
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(user)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(user.id)}>
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

export default UsersTable;
