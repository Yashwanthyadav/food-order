
import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  store: string;
}

const ProductCard = ({ id, name, price, image, description, store }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);
  const { toast } = useToast();
  const MAX_QUANTITY = 5;

  const increaseQuantity = () => {
    if (quantity < MAX_QUANTITY) {
      setQuantity(prev => prev + 1);
    } else {
      toast({
        title: "Maximum limit reached",
        description: `You can only add up to ${MAX_QUANTITY} of this item`,
        variant: "destructive",
      });
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} x ${name} to cart`);
    toast({
      title: "Added to cart",
      description: `${quantity} x ${name} added to your cart`,
    });
    setIsInCart(true);
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg hover:scale-102 cursor-pointer bg-gradient-to-b from-white to-gray-50">
      <div className="aspect-square relative overflow-hidden group">
        <img 
          src={image} 
          alt={name} 
          className="object-cover w-full h-full transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
          <div className="p-3 text-white">
            <p className="text-sm font-medium">{store}</p>
          </div>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="text-sm text-amber-600 font-medium mb-1">{store}</div>
        <h3 className="font-semibold text-lg text-gray-800">{name}</h3>
        <p className="text-muted-foreground line-clamp-2 text-sm mt-1">{description}</p>
        <div className="mt-2 font-bold text-lg text-gray-900">${price.toFixed(2)}</div>
        
        {isInCart ? (
          <div className="flex items-center mt-2">
            <span className="text-sm text-green-600 font-medium flex items-center">
              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Added to cart
              </span>
            </span>
          </div>
        ) : (
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center border rounded bg-white shadow-sm">
              <Button 
                onClick={decreaseQuantity} 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 p-0 text-gray-600" 
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="px-2 min-w-8 text-center font-medium">{quantity}</span>
              <Button 
                onClick={increaseQuantity} 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 p-0 text-gray-600"
                disabled={quantity >= MAX_QUANTITY}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {isInCart ? (
          <Button 
            className="w-full bg-green-600 hover:bg-green-700"
            size="sm"
            asChild
          >
            <Link to="/cart">
              <ShoppingCart className="mr-2 h-4 w-4" /> 
              View Cart
            </Link>
          </Button>
        ) : (
          <Button 
            onClick={handleAddToCart} 
            className="w-full bg-amber-600 hover:bg-amber-700"
            size="sm"
          >
            <ShoppingCart className="mr-2 h-4 w-4" /> 
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
