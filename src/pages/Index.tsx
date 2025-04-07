import React from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";

// Updated product data with biryani, mandi, paratha and curries
const products = [
  {
    id: "1",
    name: "Hyderabadi Chicken Biryani",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=400&auto=format",
    description: "Fragrant basmati rice cooked with tender chicken, saffron, and authentic spices in the traditional Hyderabadi style.",
    store: "Biryani House"
  },
  {
    id: "2",
    name: "Lamb Mandi Rice",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=400&auto=format",
    description: "Slow-cooked tender lamb served over aromatic rice with Middle Eastern spices and roasted nuts.",
    store: "Mandi Palace"
  },
  {
    id: "3",
    name: "Butter Chicken Curry",
    price: 13.99,
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=400&auto=format",
    description: "Creamy tomato-based curry with tender chicken pieces, flavored with butter and aromatic spices.",
    store: "Curry Delight"
  },
  {
    id: "4",
    name: "Flaky Paratha Bread",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1565280654386-466afe82abe3?q=80&w=400&auto=format",
    description: "Layered whole wheat flatbread, pan-fried to perfection. Served hot and flaky.",
    store: "Paratha Corner"
  },
  {
    id: "5",
    name: "Vegetable Biryani",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?q=80&w=400&auto=format",
    description: "Fragrant basmati rice cooked with mixed vegetables, saffron, and authentic spices in the traditional style.",
    store: "Biryani House"
  },
  {
    id: "6",
    name: "Chicken Korma Curry",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1574653853027-5382a3d23a7d?q=80&w=400&auto=format",
    description: "Mild and creamy curry made with chicken, yogurt, nuts, and aromatic spices. Perfect with rice or bread.",
    store: "Curry Delight"
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
