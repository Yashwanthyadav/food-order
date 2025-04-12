
import React, { useState, useEffect } from "react";
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
import { Minus, Plus, Trash2, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import OrderSuccess from "@/components/OrderSuccess";
import { useProducts } from "@/contexts/ProductContext";

// Payment methods
const paymentMethods = [
  { id: "razorpay", name: "Razorpay (Credit/Debit/UPI)", icon: "💳" },
  { id: "upi", name: "UPI / PhonePe / Google Pay", icon: "💳" },
  { id: "card", name: "Credit / Debit Card", icon: "💳" },
  { id: "cod", name: "Cash on Delivery", icon: "💵" },
];

// Razorpay key - this is a public key, safe to be in frontend code
const razorpayKeyId = "rzp_test_YourTestKeyHere"; // Replace with your actual Razorpay test key

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Cart = () => {
  const { cartItems, updateCartItemQuantity, removeFromCart, clearCart } = useProducts();
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Calculate totals
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 0 ? 199 : 0; // ₹199 delivery fee
  const tax = subtotal * 0.08; // Assuming 8% tax
  const grandTotal = subtotal + deliveryFee + tax - discount;

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
  
  const handleRazorpayPayment = () => {
    if (!window.Razorpay) {
      toast({
        title: "Payment Error",
        description: "Razorpay is not loaded. Please try again later.",
        variant: "destructive",
      });
      return;
    }
    
    // Generate a random receipt ID
    const receiptId = 'rcpt_' + Math.random().toString(36).substring(2, 15);
    
    // Razorpay options
    const options = {
      key: razorpayKeyId,
      amount: Math.round(grandTotal * 100), // amount in paisa
      currency: "INR",
      name: "ShopNearby",
      description: "Food Order Payment",
      image: "https://placeholder.pics/svg/300/2196F3/FFFFFF/shop-icon",
      order_id: "", // Will be generated on the server in a real app
      handler: function (response: any) {
        console.log("Payment success:", response);
        // Generate a random order ID
        const newOrderId = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        setOrderId(newOrderId);
        setIsProcessing(false);
        setIsSuccess(true);
        clearCart();
        
        toast({
          title: "Payment Successful",
          description: `Payment ID: ${response.razorpay_payment_id}`,
        });
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Customer Address",
      },
      theme: {
        color: "#F37254",
      },
      modal: {
        ondismiss: function () {
          setIsProcessing(false);
          toast({
            title: "Payment Cancelled",
            description: "You have cancelled the payment process.",
            variant: "destructive",
          });
        },
      },
    };
    
    const razorpay = new window.Razorpay(options);
    razorpay.open();
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

    // Handle different payment methods
    if (paymentMethod === "razorpay") {
      handleRazorpayPayment();
    } else {
      // Simulate order processing for other payment methods
      setTimeout(() => {
        // Generate a random order ID
        const newOrderId = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        setOrderId(newOrderId);
        setIsProcessing(false);
        setIsSuccess(true);

        // Clear cart after successful order
        clearCart();
      }, 2000);
    }
  };

  const handleCloseSuccessModal = () => {
    setIsSuccess(false);
    navigate('/');
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
                          onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
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
                          onClick={() => removeFromCart(item.id)}
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
                            {method.id === "razorpay" && (
                              <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">Recommended</span>
                            )}
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
                    className="w-full bg-amber-600 hover:bg-amber-700 flex items-center gap-2"
                    onClick={handlePlaceOrder}
                    disabled={isProcessing || cartItems.length === 0}
                  >
                    {isProcessing ? (
                      "Processing..."
                    ) : (
                      <>
                        {paymentMethod === "razorpay" ? <CreditCard className="h-4 w-4" /> : null}
                        {paymentMethod === "razorpay" ? "Pay with Razorpay" : "Place Order"}
                      </>
                    )}
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
