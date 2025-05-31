import axios from "axios";
import { create } from "zustand";

export type CartItem = {
  id? : string
  productId: string;
  name : string
  price : number
  images : string
  quantity: number;
  product: {
      name: string;
      price: number;
      images: {
        secure_url: string;
      }[];
    };
};
type CartStore = {
  cart: CartItem[];
  getCart: () => CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  increaseQty: (productId: string, item: CartItem) => void;
  decreaseQty: (productId: string, item: CartItem) => void;
  getTotalQuantity: () => number;
  getTotalPrice: () => number;
  fetchCart: () => Promise<void>;
};

export const useCartStore = create<CartStore>((set, get) => ({
  
  cart: [],
  getCart: () => get().cart,
  addToCart: (item: CartItem) => {
    const existingItem = get().cart?.find((i) => i.productId === item.productId);

    if (existingItem) {
      set((state) => ({
        cart: state.cart.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        ),
      }));
      
    } else {
      set((state) => ({
        cart: [...state.cart || [], item],
      }));
    }
  },

  removeFromCart: async (cartItemId: string) => {
    try { 
      console.log("Trying to delete productId:", cartItemId);
      await axios.delete(`/api/cart/${cartItemId}`)
      set((state) => ({
      cart: state.cart.filter((i) => i.id !== cartItemId),
    }));

    }catch(err){
      console.log(err);
    }
  },

  clearCart: async () => {
    try { 
      await axios.delete('/api/cart')
      set(() => ({
      cart: [],
    }));
    console.log('Cart cleared successfully');
    
    }catch(err) {
      console.log(err);
    }
  },

  increaseQty: (productId: string, item: CartItem) => {
    set((state) => ({
      cart: state.cart.map((i) =>
        i.productId === productId
          ? { ...i, quantity: i.quantity + item.quantity }
          : i
      ),
    }));
  },

  decreaseQty: (productId: string, item: CartItem) => {
    set((state) => ({
      cart: state.cart
        .map((i) =>
          i.productId === productId
            ? { ...i, quantity: i.quantity - item.quantity }
            : i
        )
        .filter((i) => i.quantity > 0),
    }));
  },

  getTotalQuantity: () =>
    get().cart.reduce(
      (count: number, item: CartItem) => count + item.quantity,
      0
    ),
  getTotalPrice: () =>
    get().cart.reduce((price, item) => price + item.product.price * item.quantity, 0),

  fetchCart : async () => {
    try {
        const res = await axios.get('/api/cart')
        set({cart : res.data.cartItems}) 
    }catch(err) { 
        console.error("Failed to fetch cart", err);
    }
  }

}));
