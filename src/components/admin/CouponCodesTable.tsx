
import React, { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Plus, Save, Trash2, X, BadgeIndianRupee } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

interface CouponCode {
  id: number;
  code: string;
  discount: number;
  type: string;
  minAmount: number;
  maxUses: number;
  usedCount: number;
  expiryDate: string;
  status: string;
}

const CouponCodesTable = () => {
  const { toast } = useToast();
  // Sample coupon data
  const [coupons, setCoupons] = useState<CouponCode[]>([
    { id: 1, code: "WELCOME20", discount: 20, type: "percentage", minAmount: 200, maxUses: 100, usedCount: 45, expiryDate: "2025-12-31", status: "active" },
    { id: 2, code: "FLAT50", discount: 50, type: "fixed", minAmount: 300, maxUses: 50, usedCount: 12, expiryDate: "2025-06-30", status: "active" },
    { id: 3, code: "SUMMER25", discount: 25, type: "percentage", minAmount: 150, maxUses: 200, usedCount: 198, expiryDate: "2025-04-15", status: "active" },
    { id: 4, code: "SPECIAL100", discount: 100, type: "fixed", minAmount: 500, maxUses: 25, usedCount: 25, expiryDate: "2025-01-01", status: "expired" }
  ]);

  const [editingCoupon, setEditingCoupon] = useState<CouponCode | null>(null);
  const [newCoupon, setNewCoupon] = useState(false);
  const [formData, setFormData] = useState<CouponCode>({
    id: 0,
    code: "",
    discount: 0,
    type: "percentage",
    minAmount: 0,
    maxUses: 0,
    usedCount: 0,
    expiryDate: "",
    status: "active"
  });

  const handleEdit = (coupon: CouponCode) => {
    setEditingCoupon(coupon);
    setFormData(coupon);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: ["discount", "minAmount", "maxUses", "usedCount"].includes(name) ? Number(value) : value
    });
  };

  const handleSelectChange = (value: string, field: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const generateRandomCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData({
      ...formData,
      code: result
    });
  };

  const validateCouponForm = () => {
    if (!formData.code.trim()) {
      toast({
        title: "Validation Error",
        description: "Coupon code cannot be empty",
        variant: "destructive"
      });
      return false;
    }

    if (formData.discount <= 0) {
      toast({
        title: "Validation Error",
        description: "Discount must be greater than 0",
        variant: "destructive"
      });
      return false;
    }

    if (formData.minAmount < 0) {
      toast({
        title: "Validation Error",
        description: "Minimum amount cannot be negative",
        variant: "destructive"
      });
      return false;
    }

    if (formData.maxUses <= 0) {
      toast({
        title: "Validation Error",
        description: "Maximum uses must be greater than 0",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.expiryDate) {
      toast({
        title: "Validation Error",
        description: "Expiry date is required",
        variant: "destructive"
      });
      return false;
    }

    // Check if the coupon code already exists (for new coupons)
    if (newCoupon && coupons.some(coupon => coupon.code === formData.code)) {
      toast({
        title: "Validation Error",
        description: "Coupon code already exists",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleSave = () => {
    if (!validateCouponForm()) {
      return;
    }

    if (newCoupon) {
      // Add new coupon
      const newCouponWithId = {
        ...formData,
        id: coupons.length > 0 ? Math.max(...coupons.map(coupon => coupon.id)) + 1 : 1,
        usedCount: 0
      };
      setCoupons([...coupons, newCouponWithId]);
      toast({
        title: "Coupon Added",
        description: `Coupon code ${newCouponWithId.code} has been created.`,
      });
    } else {
      // Update existing coupon
      setCoupons(coupons.map(coupon => coupon.id === formData.id ? formData : coupon));
      toast({
        title: "Coupon Updated",
        description: `Coupon code ${formData.code} has been updated.`,
      });
    }
    setEditingCoupon(null);
    setNewCoupon(false);
  };

  const handleDelete = (id: number) => {
    const couponToDelete = coupons.find(coupon => coupon.id === id);
    if (couponToDelete) {
      setCoupons(coupons.filter(coupon => coupon.id !== id));
      toast({
        title: "Coupon Deleted",
        description: `Coupon code ${couponToDelete.code} has been removed from the system.`,
        variant: "destructive"
      });
    }
  };

  const handleAddNew = () => {
    setNewCoupon(true);
    const today = new Date();
    const oneYearLater = new Date();
    oneYearLater.setFullYear(today.getFullYear() + 1);
    
    setFormData({
      id: 0,
      code: "",
      discount: 10,
      type: "percentage",
      minAmount: 100,
      maxUses: 50,
      usedCount: 0,
      expiryDate: oneYearLater.toISOString().split('T')[0],
      status: "active"
    });
  };

  const handleCancel = () => {
    setEditingCoupon(null);
    setNewCoupon(false);
  };

  const verifyCouponStatus = (coupon: CouponCode) => {
    const today = new Date();
    const expiryDate = new Date(coupon.expiryDate);
    
    if (expiryDate < today) {
      return "expired";
    }
    
    if (coupon.usedCount >= coupon.maxUses) {
      return "exhausted";
    }
    
    return coupon.status;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Coupon Codes</h2>
        <div className="flex items-center gap-2">
          <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full flex items-center gap-1 text-sm">
            <BadgeIndianRupee className="h-3.5 w-3.5" />
            <span>Indian Rupee (₹)</span>
          </div>
          <Button size="sm" className="bg-amber-600 hover:bg-amber-700" onClick={handleAddNew}>
            <Plus className="h-4 w-4 mr-1" /> Add Coupon
          </Button>
        </div>
      </div>
      
      <Table>
        <TableCaption>A list of all coupon codes.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Code</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Min Amount (₹)</TableHead>
            <TableHead>Usage</TableHead>
            <TableHead>Expires</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {newCoupon && (
            <TableRow>
              <TableCell>
                <div className="flex gap-2 items-center">
                  <Input 
                    value={formData.code} 
                    name="code" 
                    onChange={handleChange} 
                    placeholder="Coupon code"
                    className="uppercase"
                    required
                  />
                  <Button variant="outline" size="sm" onClick={generateRandomCode}>
                    <Plus className="h-3 w-3 mr-1" /> Generate
                  </Button>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-2 items-center">
                  <Input 
                    type="number"
                    value={formData.discount} 
                    name="discount" 
                    onChange={handleChange} 
                    min={1}
                    className="w-20"
                    required
                  />
                  <Select 
                    value={formData.type} 
                    onValueChange={(value) => handleSelectChange(value, "type")}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">%</SelectItem>
                      <SelectItem value="fixed">₹ Fixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TableCell>
              <TableCell>
                <Input 
                  type="number"
                  value={formData.minAmount} 
                  name="minAmount" 
                  onChange={handleChange}
                  min={0}
                  className="w-24"
                  required
                />
              </TableCell>
              <TableCell>
                <Input 
                  type="number"
                  value={formData.maxUses} 
                  name="maxUses" 
                  onChange={handleChange}
                  min={1}
                  className="w-20"
                  required
                />
              </TableCell>
              <TableCell>
                <Input 
                  type="date"
                  value={formData.expiryDate} 
                  name="expiryDate" 
                  onChange={handleChange}
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
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
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
          
          {coupons.map((coupon) => {
            const couponStatus = verifyCouponStatus(coupon);
            
            return (
              <TableRow key={coupon.id}>
                {editingCoupon?.id === coupon.id ? (
                  <>
                    <TableCell>
                      <Input 
                        value={formData.code} 
                        name="code" 
                        onChange={handleChange}
                        className="uppercase"
                        required
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2 items-center">
                        <Input 
                          type="number"
                          value={formData.discount} 
                          name="discount" 
                          onChange={handleChange}
                          min={1}
                          className="w-20"
                          required
                        />
                        <Select 
                          value={formData.type} 
                          onValueChange={(value) => handleSelectChange(value, "type")}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="percentage">%</SelectItem>
                            <SelectItem value="fixed">₹ Fixed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Input 
                        type="number"
                        value={formData.minAmount} 
                        name="minAmount" 
                        onChange={handleChange}
                        min={0}
                        className="w-24"
                        required
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1 items-center">
                        <span>{formData.usedCount} / </span>
                        <Input 
                          type="number"
                          value={formData.maxUses} 
                          name="maxUses" 
                          onChange={handleChange}
                          min={formData.usedCount}
                          className="w-20"
                          required
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Input 
                        type="date"
                        value={formData.expiryDate} 
                        name="expiryDate" 
                        onChange={handleChange}
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
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="expired">Expired</SelectItem>
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
                    <TableCell className="font-semibold text-amber-600">{coupon.code}</TableCell>
                    <TableCell>
                      {coupon.discount}{coupon.type === 'percentage' ? '%' : ' ₹'}
                    </TableCell>
                    <TableCell>₹{coupon.minAmount}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span>{coupon.usedCount} / {coupon.maxUses}</span>
                        {coupon.usedCount >= coupon.maxUses && (
                          <Badge variant="outline" className="bg-orange-100 text-orange-800 text-xs">Exhausted</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{coupon.expiryDate}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={couponStatus === "active" ? "default" : "secondary"} 
                        className={
                          couponStatus === "active" ? "bg-green-500" : 
                          couponStatus === "expired" ? "bg-red-400" :
                          "bg-gray-400"
                        }
                      >
                        {couponStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(coupon)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(coupon.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default CouponCodesTable;
