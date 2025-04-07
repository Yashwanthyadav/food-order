
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  store: string;
}

const ProductCard = ({ id, name, price, image, description, store }: ProductCardProps) => {
  const handleAddToCart = () => {
    console.log(`Added ${name} to cart`);
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
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart} 
          className="w-full"
          size="sm"
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
