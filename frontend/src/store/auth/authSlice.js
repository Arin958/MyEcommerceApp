import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const signUpUser = createAsyncThunk(
  "auth/signup",
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post(`${API}/api/auth/signup`, formData, {
        withCredentials: true, // ✅ send cookies
        headers: {
          "Content-Type": "application/json", // ✅ ensure proper content type
        },
      });
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const testCookies  = createAsyncThunk(
  "auth/test",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${API}/api/test-cookies`, {
        withCredentials: true, // ✅ send cookies
      });
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post(`${API}/api/auth/login`, formData, {
        withCredentials: true, // ✅ send cookies
        headers: {
          "Content-Type": "application/json", // ✅ ensure proper content type
        },
      });
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post(`${API}/api/auth/logout`, null, { withCredentials: true });
    return null;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const verifyEmail = createAsyncThunk(
  "auth/verify",
  async (code, thunkAPI) => {
    try {
      const res = await axios.post(
        `${API}/api/auth/verify-email`,
        { code },
        {
          withCredentials: true, // ✅ send cookies
          headers: {
            "Content-Type": "application/json", // ✅ ensure proper content type
          },
        }
      );
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgot",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(`${API}/api/auth/forgot-password`, data);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/reset",
  async ({ token, password }, thunkAPI) => {
    try {
      const res = await axios.post(`${API}/api/auth/reset-password/${token}`, {
        password,
      });
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const checkAuth = createAsyncThunk("auth/check", async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${API}/api/auth/check-auth`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const generateGuestId = () => {
  const storedId = localStorage.getItem("guestId");
  if (storedId) return storedId;

  const newId = crypto.randomUUID();
  localStorage.setItem("guestId", newId);
  return newId;
};

const initialState = {
  loading: false,
  user: null,
  error: null,
  success: null,
  isAuthenticated: false,
  guestId: generateGuestId(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthMessage: (state) => {
      state.success = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
       
        state.loading = false;
        state.user = action.payload.user;
        state.success = action.payload.message;

        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;

        // 🔄 Reset guestId after logout
        const newGuestId = crypto.randomUUID();
        state.guestId = newGuestId;
        localStorage.setItem("guestId", newGuestId);
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        console.log(action.payload, "action.payload");
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(testCookies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(testCookies.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
      })
      .addCase(testCookies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { clearAuthMessage } = authSlice.actions;
export default authSlice.reducer;
