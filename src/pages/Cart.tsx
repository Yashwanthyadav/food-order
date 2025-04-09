import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import OrderSuccess from "@/components/OrderSuccess";

// Payment methods
const paymentMethods = [
  { id: "upi", name: "UPI / PhonePe / Google Pay", icon: "💳" },
  { id: "card", name: "Credit / Debit Card", icon: "💳" },
  { id: "cod", name: "Cash on Delivery", icon: "💵" },
];

// Sample cart items - in a real app, this would come from a context or state management
const initialCartItems = [
  {
    id: "1",
    name: "Hyderabadi Chicken Biryani",
    price: 999,
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=400&auto=format",
    quantity: 1,
    store: "Biryani House"
  },
  {
    id: "3",
    name: "Butter Chicken Curry",
    price: 899,
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=400&auto=format",
    quantity: 2,
    store: "Curry Delight"
  }
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  // Calculate totals
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 0 ? 199 : 0; // ₹199 delivery fee
  const tax = subtotal * 0.08; // Assuming 8% tax
  const grandTotal = subtotal + deliveryFee + tax - discount;

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 0) return;
    if (newQuantity > 5) {
      toast({
        title: "Maximum limit reached",
        description: "You can add up to 5 of each item",
        variant: "destructive",
      });
      return;
    }
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ).filter(item => item.quantity > 0) // Remove items with quantity 0
    );
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart",
    });
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      toast({
        title: "Empty coupon",
        description: "Please enter a coupon code",
        variant: "destructive",
      });
      return;
    }

    // Mock coupon logic - in a real app, this would be validated against an API
    if (couponCode.toUpperCase() === "WELCOME10") {
      const newDiscount = subtotal * 0.1; // 10% discount
      setDiscount(newDiscount);
      toast({
        title: "Coupon applied!",
        description: "10% discount has been applied to your order",
      });
    } else {
      toast({
        title: "Invalid coupon",
        description: "The coupon code you entered is invalid or expired",
        variant: "destructive",
      });
    }
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Empty cart",
        description: "Your cart is empty. Add some items before placing an order.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    // Simulate order processing
    setTimeout(() => {
      // Generate a random order ID
      const newOrderId = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      setOrderId(newOrderId);
      setIsProcessing(false);
      setIsSuccess(true);

      // Clear cart after successful order
      setCartItems([]);
    }, 2000);
  };

  const handleCloseSuccessModal = () => {
    setIsSuccess(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some delicious items to your cart and come back here to check out.</p>
            <Button 
              onClick={() => navigate("/")}
              className="bg-amber-600 hover:bg-amber-700"
            >
              Browse Food Items
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="md:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Cart Items ({cartItems.length})</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <div className="h-16 w-16 rounded-md overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.store}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-right min-w-[80px]">
                        <div className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Coupon Code */}
              <Card>
                <CardHeader>
                  <CardTitle>Apply Coupon</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <Button 
                      onClick={handleApplyCoupon}
                      className="whitespace-nowrap bg-amber-600 hover:bg-amber-700"
                    >
                      Apply
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Try "WELCOME10" for 10% off your order
                  </p>
                </CardContent>
              </Card>

              {/* Payment Methods */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="space-y-4">
                      {paymentMethods.map((method) => (
                        <div key={method.id} className="flex items-center space-x-2">
                          <RadioGroupItem value={method.id} id={method.id} />
                          <Label htmlFor={method.id} className="flex items-center space-x-2 cursor-pointer">
                            <span className="text-xl">{method.icon}</span>
                            <span>{method.name}</span>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹{discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery Fee</span>
                    <span>₹{deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{grandTotal.toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-amber-600 hover:bg-amber-700"
                    onClick={handlePlaceOrder}
                    disabled={isProcessing || cartItems.length === 0}
                  >
                    {isProcessing ? "Processing..." : "Place Order"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </main>

      {/* Order Success Modal */}
      <OrderSuccess 
        isOpen={isSuccess} 
        onClose={handleCloseSuccessModal} 
        orderId={orderId} 
      />
    </div>
  );
};

export default Cart;
