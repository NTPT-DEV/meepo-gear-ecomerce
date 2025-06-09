import axios from "axios";
import { create } from "zustand";

export type CartItem = {
  id?: string;
  productId: string;
  name?: string;
  price: number;
  images: string;
  quantity: number;
  product: {
    id : string
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
  updateCartItem: (updatedItem: CartItem) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  getTotalQuantity: () => number;
  getTotalPrice: () => number;
  fetchCart: () => Promise<void>;
};

export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],
  getCart: () => get().cart,

  addToCart: (item: CartItem) => {
    const existingItem = get().cart?.find(
      (i) => i.productId === item.productId
    );

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
        cart: [...(state.cart || []), item],
      }));
    }
  },

  updateCartItem: (updatedItem: CartItem) => {
  set((state) => ({
    cart: state.cart.map((item) =>
      item.id === updatedItem.id ? {...item , ...updatedItem} : item
    ),
  }));
},

  removeFromCart: async (cartItemsId: string) => {
    try {
      await axios.delete(`/api/cart/${cartItemsId}`);
      set((state) => ({
        cart: state.cart.filter((i) => i.id !== cartItemsId),
      }));
    } catch (err) {
      console.log(err);
    }
  },

  clearCart: async () => {
    try {
      await axios.delete("/api/cart");
      set(() => ({
        cart: [],
      }));
      console.log("Cart cleared successfully");
    } catch (err) {
      console.log(err);
    }
  },

  getTotalQuantity: () =>
    get().cart.reduce(
      (count: number, item: CartItem) => count + item.quantity,
      0
    ),
  getTotalPrice: () =>
    get().cart.reduce(
      (price, item) => price + item.product.price * item.quantity,
      0
    ),

  fetchCart: async () => {
    try {
      const res = await axios.get("/api/cart");
      set({ cart: res.data.cartItems });
    } catch (err) {
      console.error("Failed to fetch cart", err);
    }
  },
}));

interface QuantityStore {
  itemCount: number;
  quantity: number;
  setQuantity: (quantity: number) => void;
  increaseItemCount: () => void;
  decreaseItemCount: () => void;

  resetItemCount: () => void;
}

export const useQuantityStore = create<QuantityStore>((set) => ({
  itemCount: 1,
  quantity: 0,
  setQuantity: (quantity) => set({ itemCount: quantity }),
  increaseItemCount: () => set((state) => ({ itemCount: state.itemCount + 1 })),
  decreaseItemCount: () =>
    set((state) => {
      if (state.itemCount > 1) {
        return { itemCount: state.itemCount - 1 };
      }
      return { itemCount: 1 };
    }),
  resetItemCount: () => set({ itemCount: 1 }),
}));
