
import React from "react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface OrderSuccessProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
}

const OrderSuccess = ({ isOpen, onClose, orderId }: OrderSuccessProps) => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    onClose();
    navigate("/");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="flex justify-center my-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <DialogTitle className="text-2xl font-bold">Order Placed Successfully!</DialogTitle>
          <DialogDescription className="text-lg">
            Thank you for your order
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-sm text-muted-foreground mb-2">Order ID</p>
            <p className="font-medium">{orderId}</p>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            We've sent the order confirmation and details to your phone.
          </p>
        </div>
        <div className="flex flex-col space-y-2 mt-4">
          <Button 
            onClick={handleContinueShopping} 
            className="w-full bg-amber-600 hover:bg-amber-700"
          >
            Continue Shopping
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderSuccess;
