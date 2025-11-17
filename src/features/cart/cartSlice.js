import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const API_URL = "http://localhost:5000/api/cart";

//  Safe Fetch helper
const safeFetch = async (url, options = {}) => {
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("❌ Fetch error:", err);
    return { error: true, message: err.message };
  }
};

//  Save cart to localStorage
const saveToLocal = (state) => {
  localStorage.setItem("cartItems", JSON.stringify(state.items));
  localStorage.setItem("cartTotal", JSON.stringify(state.totalItems));
  localStorage.setItem("cartPrice", JSON.stringify(state.totalPrice));
};

// Load cart from localStorage
const loadFromLocal = () => {
  return {
    items: JSON.parse(localStorage.getItem("cartItems")) || [],
    totalItems: JSON.parse(localStorage.getItem("cartTotal")) || 0,
    totalPrice: JSON.parse(localStorage.getItem("cartPrice")) || 0,
  };
};


export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  return await safeFetch(API_URL);
});

export const addCartItem = createAsyncThunk("cart/addCartItem", async (item) => {
  return await safeFetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
});

export const decreaseCartItem = createAsyncThunk(
  "cart/decreaseCartItem",
  async ({ id, size }) => {
    return await safeFetch(`${API_URL}/decrease`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, size }),
    });
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async ({ id, size }) => {
    await safeFetch(`${API_URL}/item`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, size }),
    });
    return { id, size };
  }
);

export const clearCartFromServer = createAsyncThunk(
  "cart/clearCartFromServer",
  async () => {
    await safeFetch(API_URL, { method: "DELETE" });
    return [];
  }
);

// 🔹 Slice
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    ...loadFromLocal(),
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.error) {
          state.error = action.payload.message;
          return;
        }
        state.items = action.payload || [];
        state.totalItems = state.items.reduce((s, i) => s + (i.quantity || 0), 0);
        state.totalPrice = state.items.reduce(
          (s, i) => s + (i.price || 0) * (i.quantity || 0),
          0
        );
        saveToLocal(state);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //  Add item 
      .addCase(addCartItem.fulfilled, (state, action) => {
        if (action.payload.error) return;
        const item = action.payload;
        const existing = state.items.find(
          (i) => i.id === item.id && i.size === item.size
        );
        if (existing) {
          existing.quantity += 1; 
        } else {
          state.items.push({ ...item, quantity: 1 }); 
        }
        state.totalItems = state.items.reduce((s, i) => s + i.quantity, 0);
        state.totalPrice = state.items.reduce(
          (s, i) => s + i.price * i.quantity,
          0
        );
        saveToLocal(state);
      })

      //  Decrease item 
      .addCase(decreaseCartItem.fulfilled, (state, action) => {
        if (action.payload.error) return;
        const { id, size } = action.meta.arg; 
        const existing = state.items.find((i) => i.id === id && i.size === size);
        if (existing) {
          if (existing.quantity > 1) existing.quantity -= 1;
          else
            state.items = state.items.filter(
              (i) => !(i.id === id && i.size === size)
            );
        }
        state.totalItems = state.items.reduce((s, i) => s + i.quantity, 0);
        state.totalPrice = state.items.reduce(
          (s, i) => s + i.price * i.quantity,
          0
        );
        saveToLocal(state);
      })

      //  Remove item
      .addCase(removeCartItem.fulfilled, (state, action) => {
        const { id, size } = action.payload;
        state.items = state.items.filter(
          (i) => !(i.id === id && i.size === size)
        );
        state.totalItems = state.items.reduce((s, i) => s + i.quantity, 0);
        state.totalPrice = state.items.reduce(
          (s, i) => s + i.price * i.quantity,
          0
        );
        saveToLocal(state);
      })

      //  Clear cart
      .addCase(clearCartFromServer.fulfilled, (state) => {
        state.items = [];
        state.totalItems = 0;
        state.totalPrice = 0;
        localStorage.removeItem("cartItems");
        localStorage.removeItem("cartTotal");
        localStorage.removeItem("cartPrice");
      });
  },
});

export default cartSlice.reducer;
