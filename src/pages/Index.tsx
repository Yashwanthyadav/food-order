
import Header from "@/components/Header";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to ShopNearby</h1>
          <p className="text-xl text-gray-600">Find stores and products near your location</p>
          
          {/* Content will go here */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Placeholder for future content */}
            <div className="p-6 bg-card rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Browse Categories</h3>
              <p className="text-muted-foreground">Explore products across multiple categories</p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Local Promotions</h3>
              <p className="text-muted-foreground">Discover special offers near you</p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Quick Delivery</h3>
              <p className="text-muted-foreground">Get products delivered to your doorstep</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
