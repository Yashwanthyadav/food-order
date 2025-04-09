
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/contexts/ProductContext";

const Index = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const { products } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Filter products when search query changes
  useEffect(() => {
    if (searchQuery) {
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.store.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery, products]);

  const handleSearch = (query: string) => {
    if (query) {
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.store.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  return (
    <div className="min-h-screen bg-background animated-bg">
      <div className="animated-overlay"></div>
      <Header onSearch={handleSearch} />
      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-12 glass-morphism p-8 rounded-lg shadow-xl relative overflow-hidden">
          <div className="hero-pulse absolute inset-0 opacity-20 rounded-lg"></div>
          <h1 className="text-4xl font-bold mb-4 float-element">Welcome to ShopNearby</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Find stores and products near your location</p>
        </div>
        
        <section className="shine-border p-0.5 mb-12">
          <div className="neo-blur p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-6 text-gradient">
              {searchQuery ? `Search Results for "${searchQuery}"` : "Featured Products"}
            </h2>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-lg text-gray-600 dark:text-gray-300">No products found matching your search.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            )}
          </div>
        </section>
        
        <section className="mt-16">
          <h2 className="text-2xl font-semibold mb-6 text-gradient">Browse Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 glass-morphism rounded-lg hover:scale-102 transition-transform duration-300">
              <h3 className="text-lg font-semibold mb-2">Fresh Produce</h3>
              <p className="text-muted-foreground">Locally sourced fruits and vegetables</p>
            </div>
            <div className="p-6 glass-morphism rounded-lg hover:scale-102 transition-transform duration-300">
              <h3 className="text-lg font-semibold mb-2">Bakery Items</h3>
              <p className="text-muted-foreground">Fresh breads and pastries</p>
            </div>
            <div className="p-6 glass-morphism rounded-lg hover:scale-102 transition-transform duration-300">
              <h3 className="text-lg font-semibold mb-2">Dairy & Eggs</h3>
              <p className="text-muted-foreground">Fresh milk, cheese, and organic eggs</p>
            </div>
          </div>
        </section>
        
        <footer className="mt-20 py-6 text-center border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Developed by © 2025 Yashwanth Bachhanaboni. All rights reserved.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
