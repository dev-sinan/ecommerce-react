import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 🟢 1. Fetch cart from backend
export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const res = await fetch("http://localhost:5000/api/cart");
  const data = await res.json();
  return data;
});

// 🟢 2. Add item to backend cart
export const addCartItem = createAsyncThunk("cart/addCartItem", async (item) => {
  const res = await fetch("http://localhost:5000/api/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  const data = await res.json();
  return data;
});

// 🟡 3. Remove item from backend cart
export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (id) => {
    await fetch(`http://localhost:5000/api/cart/${id}`, { method: "DELETE" });
    return id;
  }
);

// 🔴 4. Clear backend cart
export const clearCartFromServer = createAsyncThunk(
  "cart/clearCartFromServer",
  async () => {
    await fetch("http://localhost:5000/api/cart", { method: "DELETE" });
    return [];
  }
);

// 🟢 Local Storage Sync (fallback)
const savedCart = JSON.parse(localStorage.getItem("cartState"));

const initialState = savedCart || {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

const saveToLocalStorage = (state) => {
  localStorage.setItem("cartState", JSON.stringify(state));
};

// 🧠 Slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ✅ Add item logic (fixed)
    addToCart: (state, action) => {
      const item = action.payload;
      const itemId = item._id || item.id;
      const sizeKey = item.size || "N/A";

      const existing = state.items.find(
        (i) =>
          (i._id === itemId || i.id === itemId) &&
          (i.size || "N/A") === sizeKey
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...item, id: itemId, size: sizeKey, quantity: 1 });
      }

      // Totals
      state.totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
      state.totalPrice = state.items.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
      );

      saveToLocalStorage(state);
    },

    // 🟡 Decrease Quantity
    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items.find((i) => i._id === id || i.id === id);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter(
          (i) => i._id !== id && i.id !== id
        );
      }

      state.totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
      state.totalPrice = state.items.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
      );

      saveToLocalStorage(state);
    },

    // 🗑 Remove item
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(
        (i) => i._id !== id && i.id !== id
      );

      state.totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
      state.totalPrice = state.items.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
      );

      saveToLocalStorage(state);
    },

    // 🔄 Clear all
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
      saveToLocalStorage(state);
    },
  },

  // 🧩 Backend sync
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload || [];
        state.totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
        state.totalPrice = state.items.reduce(
          (sum, i) => sum + i.price * i.quantity,
          0
        );
        saveToLocalStorage(state);
      })

      .addCase(addCartItem.fulfilled, (state, action) => {
        const item = action.payload;
        const itemId = item._id || item.id;
        const sizeKey = item.size || "N/A";

        const existing = state.items.find(
          (i) =>
            (i._id === itemId || i.id === itemId) &&
            (i.size || "N/A") === sizeKey
        );

        if (existing) {
          existing.quantity += item.quantity || 1;
        } else {
          state.items.push({ ...item, id: itemId, size: sizeKey, quantity: 1 });
        }

        state.totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
        state.totalPrice = state.items.reduce(
          (sum, i) => sum + i.price * i.quantity,
          0
        );
        saveToLocalStorage(state);
      })

      .addCase(removeCartItem.fulfilled, (state, action) => {
        const id = action.payload;
        state.items = state.items.filter(
          (i) => i._id !== id && i.id !== id
        );
        state.totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
        state.totalPrice = state.items.reduce(
          (sum, i) => sum + i.price * i.quantity,
          0
        );
        saveToLocalStorage(state);
      })

      .addCase(clearCartFromServer.fulfilled, (state) => {
        state.items = [];
        state.totalItems = 0;
        state.totalPrice = 0;
        saveToLocalStorage(state);
      });
  },
});

export const { addToCart, decreaseQuantity, removeFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
