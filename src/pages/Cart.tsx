
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Minus, Plus, ShoppingBag, Trash2, CreditCard, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Hyderabadi Chicken Biryani",
      price: 12.99,
      image: "https://source.unsplash.com/random/100x100/?biryani",
      quantity: 2
    },
    {
      id: "2",
      name: "Lamb Mandi Rice",
      price: 15.99,
      image: "https://source.unsplash.com/random/100x100/?mandi",
      quantity: 1
    },
    {
      id: "3",
      name: "Butter Chicken Curry",
      price: 11.99,
      image: "https://source.unsplash.com/random/100x100/?curry",
      quantity: 1
    }
  ]);
  
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const { toast } = useToast();

  // Constants for calculations
  const TAX_RATE = 0.08; // 8% tax
  const DELIVERY_FEE = 3.99;
  
  // Cart calculations
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const taxAmount = subtotal * TAX_RATE;
  const total = subtotal + taxAmount + DELIVERY_FEE - discount;

  // Coupon codes (in a real app, these would come from a backend)
  const validCoupons = {
    "WELCOME20": 0.2, // 20% off
    "SAVE10": 0.1,    // 10% off
    "FREESHIP": 3.99  // Free delivery
  };

  // Handle quantity change
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    
    if (newQuantity > 5) {
      toast({
        title: "Maximum limit reached",
        description: "You can only add up to 5 of each item",
        variant: "destructive",
      });
      return;
    }

    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? {...item, quantity: newQuantity} : item
      )
    );
  };

  // Remove item from cart
  const removeItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart",
    });
  };

  // Apply coupon code
  const applyCoupon = () => {
    setIsApplyingCoupon(true);
    
    // Simulate API call
    setTimeout(() => {
      if (couponCode in validCoupons) {
        const discountRate = validCoupons[couponCode as keyof typeof validCoupons];
        
        if (couponCode === "FREESHIP") {
          setDiscount(DELIVERY_FEE);
          toast({
            title: "Coupon applied!",
            description: "Free delivery coupon applied successfully.",
          });
        } else {
          const discountAmount = subtotal * discountRate;
          setDiscount(discountAmount);
          toast({
            title: "Coupon applied!",
            description: `${discountRate * 100}% discount coupon applied successfully.`,
          });
        }
      } else {
        toast({
          title: "Invalid coupon",
          description: "The coupon code you entered is invalid or expired.",
          variant: "destructive",
        });
      }
      setIsApplyingCoupon(false);
    }, 800);
  };

  // Process payment
  const processPayment = () => {
    toast({
      title: "Processing payment...",
      description: "Your order is being processed.",
    });
    
    // Simulate payment processing
    setTimeout(() => {
      toast({
        title: "Payment successful!",
        description: "Your order has been placed successfully.",
      });
      // In a real app, you would redirect to an order confirmation page
      // window.location.href = "/order-confirmation";
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Your Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Button className="bg-amber-600 hover:bg-amber-700" asChild>
            <a href="/">Continue Shopping</a>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cart Items Table */}
          <div className="md:col-span-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Product</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="w-[40px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-16 h-16 rounded-md object-cover"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center border rounded bg-white shadow-sm max-w-[120px]">
                        <Button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 p-0 text-gray-600" 
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="px-2 min-w-8 text-center font-medium">{item.quantity}</span>
                        <Button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 p-0 text-gray-600"
                          disabled={item.quantity >= 5}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {/* Order Summary */}
          <div className="space-y-6">
            {/* Coupon Section */}
            <div className="bg-white rounded-lg border p-4 shadow-sm">
              <h2 className="font-semibold text-lg mb-4">Promo Code</h2>
              <div className="flex gap-2">
                <Input 
                  placeholder="Enter coupon code" 
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                />
                <Button 
                  variant="outline" 
                  onClick={applyCoupon}
                  disabled={isApplyingCoupon || !couponCode}
                  className="whitespace-nowrap"
                >
                  {isApplyingCoupon ? "Applying..." : "Apply"}
                </Button>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                <p>Try these codes: WELCOME20, SAVE10, FREESHIP</p>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="bg-white rounded-lg border p-4 shadow-sm">
              <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${taxAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>${DELIVERY_FEE.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold text-base">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Payment Methods */}
            <div className="bg-white rounded-lg border p-4 shadow-sm">
              <h2 className="font-semibold text-lg mb-4">Payment Method</h2>
              <RadioGroup 
                value={paymentMethod} 
                onValueChange={setPaymentMethod}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2 border rounded-md p-3 transition-colors hover:bg-gray-50">
                  <RadioGroupItem value="upi" id="upi" />
                  <Label htmlFor="upi" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">UPI</p>
                      <p className="text-xs text-muted-foreground">Google Pay, PhonePe, Paytm</p>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3 transition-colors hover:bg-gray-50">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                      <CreditCard size={16} />
                    </div>
                    <div>
                      <p className="font-medium">Credit/Debit Card</p>
                      <p className="text-xs text-muted-foreground">Visa, Mastercard, RuPay</p>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3 transition-colors hover:bg-gray-50">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="M7 15h0M12 15h0" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Cash on Delivery</p>
                      <p className="text-xs text-muted-foreground">Pay when your order arrives</p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
              
              <div className="mt-4 text-xs text-amber-700 bg-amber-50 p-3 rounded-md flex items-start gap-2">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p>This is a demo. No actual payment will be processed.</p>
              </div>
            </div>
            
            {/* Checkout Button */}
            <Button 
              className="w-full bg-amber-600 hover:bg-amber-700 py-6"
              onClick={processPayment}
            >
              Place Order
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
