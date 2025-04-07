
import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
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
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-square relative overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="object-cover w-full h-full"
        />
      </div>
      <CardContent className="p-4">
        <div className="text-sm text-muted-foreground mb-1">{store}</div>
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-muted-foreground line-clamp-2 text-sm mt-1">{description}</p>
        <div className="mt-2 font-bold">${price.toFixed(2)}</div>
        
        {isInCart ? (
          <div className="flex items-center mt-2">
            <span className="text-sm text-green-600 font-medium">Added to cart</span>
          </div>
        ) : (
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center border rounded">
              <Button 
                onClick={decreaseQuantity} 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 p-0" 
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="px-2 min-w-8 text-center">{quantity}</span>
              <Button 
                onClick={increaseQuantity} 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 p-0"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart} 
          className="w-full"
          size="sm"
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> 
          {isInCart ? "Add More" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
