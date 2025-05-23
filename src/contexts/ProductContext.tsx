import React, { createContext, useContext, useEffect, useState } from "react";

// Define types
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  store: string;
  hidden?: boolean;  // Added hidden property
}

interface CartItem extends Product {
  quantity: number;
}

interface AdminItem {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
}

interface ProductContextType {
  products: Product[];
  cartItems: CartItem[];
  adminItems: AdminItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (id: string) => void;
  updateCartItemQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
  getCartItemCount: () => number;
  updateAdminItems: (items: AdminItem[]) => void;
}

// Create context
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Sample product data
const initialProducts: Product[] = [
  {
    id: "1",
    name: "Hyderabadi Chicken Biryani",
    price: 999,
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=400&auto=format",
    description: "Fragrant basmati rice cooked with tender chicken, saffron, and authentic spices in the traditional Hyderabadi style.",
    store: "Biryani House"
  },
  {
    id: "2",
    name: "Lamb Mandi Rice",
    price: 1099,
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=400&auto=format",
    description: "Slow-cooked tender lamb served over aromatic rice with Middle Eastern spices and roasted nuts.",
    store: "Mandi Palace"
  },
  {
    id: "3",
    name: "Butter Chicken Curry",
    price: 899,
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=400&auto=format",
    description: "Creamy tomato-based curry with tender chicken pieces, flavored with butter and aromatic spices.",
    store: "Curry Delight"
  },
  {
    id: "4",
    name: "Flaky Paratha Bread",
    price: 199,
    image: "https://images.unsplash.com/photo-1565280654386-466afe82abe3?q=80&w=400&auto=format",
    description: "Layered whole wheat flatbread, pan-fried to perfection. Served hot and flaky.",
    store: "Paratha Corner"
  },
  {
    id: "5",
    name: "Vegetable Biryani",
    price: 799,
    image: "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?q=80&w=400&auto=format",
    description: "Fragrant basmati rice cooked with mixed vegetables, saffron, and authentic spices in the traditional style.",
    store: "Biryani House"
  },
  {
    id: "6",
    name: "Chicken Korma Curry",
    price: 949,
    image: "https://images.unsplash.com/photo-1574653853027-5382a3d23a7d?q=80&w=400&auto=format",
    description: "Mild and creamy curry made with chicken, yogurt, nuts, and aromatic spices. Perfect with rice or bread.",
    store: "Curry Delight"
  }
];

// Initial admin items
const initialAdminItems: AdminItem[] = [
  { id: 1, name: "Butter Chicken Curry", category: "Main Course", price: 220, stock: 15, status: "available" },
  { id: 2, name: "Vegetable Biryani", category: "Rice", price: 180, stock: 20, status: "available" },
  { id: 3, name: "Paneer Tikka", category: "Appetizer", price: 150, stock: 0, status: "out of stock" },
  { id: 4, name: "Garlic Naan", category: "Bread", price: 40, stock: 25, status: "available" },
  { id: 5, name: "Flaky Paratha Bread", category: "Bread", price: 35, stock: 18, status: "available" }
];

// Provider component
export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [adminItems, setAdminItems] = useState<AdminItem[]>(initialAdminItems);

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
    
    const savedAdminItems = localStorage.getItem('adminItems');
    if (savedAdminItems) {
      setAdminItems(JSON.parse(savedAdminItems));
    }
  }, []);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);
  
  // Save admin items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('adminItems', JSON.stringify(adminItems));
  }, [adminItems]);

  // Sync products with admin items
  useEffect(() => {
    // Map admin items to product format
    const updatedProducts = products.map(product => {
      // Find matching admin item by name
      const matchingItem = adminItems.find(item => 
        item.name.toLowerCase() === product.name.toLowerCase());
      
      if (matchingItem) {
        return {
          ...product,
          price: matchingItem.price,
          // Only show available products
          hidden: matchingItem.status !== "available"
        };
      }
      return product;
    });
    
    setProducts(updatedProducts);
  }, [adminItems]);

  const addToCart = (product: Product, quantity: number) => {
    setCartItems(prev => {
      const existingItemIndex = prev.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Item already in cart, update quantity
        const updatedItems = [...prev];
        const newQuantity = Math.min(updatedItems[existingItemIndex].quantity + quantity, 5);
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: newQuantity
        };
        return updatedItems;
      } else {
        // Add new item to cart
        return [...prev, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateCartItemQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    if (quantity > 5) {
      quantity = 5; // Max quantity constraint
    }
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const isInCart = (id: string) => {
    return cartItems.some(item => item.id === id);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };
  
  const updateAdminItems = (items: AdminItem[]) => {
    setAdminItems(items);
  };

  return (
    <ProductContext.Provider 
      value={{ 
        products, 
        cartItems,
        adminItems,
        addToCart, 
        removeFromCart, 
        updateCartItemQuantity, 
        clearCart,
        isInCart,
        getCartItemCount,
        updateAdminItems
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook for using the context
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
