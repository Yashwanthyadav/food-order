
import React from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";

// Sample product data
const products = [
  {
    id: "1",
    name: "Fresh Organic Avocados",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=400&auto=format",
    description: "Ripe, buttery Hass avocados perfect for guacamole or avocado toast. Locally sourced from organic farms.",
    store: "Green Market"
  },
  {
    id: "2",
    name: "Artisan Sourdough Bread",
    price: 5.49,
    image: "https://images.unsplash.com/photo-1585478259515-2224b028539e?q=80&w=400&auto=format",
    description: "Freshly baked sourdough with a crispy crust and soft interior. Made with our 100-year-old starter.",
    store: "City Bakery"
  },
  {
    id: "3",
    name: "Premium Grass-Fed Beef",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=400&auto=format",
    description: "Ethically raised grass-fed beef from local farms. Hormone and antibiotic free.",
    store: "Butcher's Choice"
  },
  {
    id: "4",
    name: "Organic Strawberries",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=400&auto=format",
    description: "Sweet and juicy organic strawberries freshly picked at peak ripeness.",
    store: "Fresh Farms"
  },
  {
    id: "5",
    name: "Gourmet Italian Pasta",
    price: 3.49,
    image: "https://images.unsplash.com/photo-1551462147-37885acc36f1?q=80&w=400&auto=format",
    description: "Authentic Italian pasta made with durum wheat semolina. Perfect al dente texture.",
    store: "Pasta Palace"
  },
  {
    id: "6",
    name: "Aged Cheddar Cheese",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1566454825481-9c31bd88df4a?q=80&w=400&auto=format",
    description: "Sharp and tangy aged cheddar cheese. Perfect for sandwiches or charcuterie boards.",
    store: "Cheese Haven"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to ShopNearby</h1>
          <p className="text-xl text-gray-600">Find stores and products near your location</p>
        </div>
        
        <section>
          <h2 className="text-2xl font-semibold mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>
        
        <section className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">Browse Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-card rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Fresh Produce</h3>
              <p className="text-muted-foreground">Locally sourced fruits and vegetables</p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Bakery Items</h3>
              <p className="text-muted-foreground">Fresh breads and pastries</p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Dairy & Eggs</h3>
              <p className="text-muted-foreground">Fresh milk, cheese, and organic eggs</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
