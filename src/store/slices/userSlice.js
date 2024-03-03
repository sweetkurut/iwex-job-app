import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import allAPIs from "../../services/API/";
// =========SignUp========

export const sendSignUp = createAsyncThunk(
  "user/sendSignUp",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await allAPIs.signUp(userData);
      return response.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const sendVerifyEmail = createAsyncThunk(
  "user/sendVerifyEmail",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await allAPIs.verify_email(userData);
      if (response.status === 200 || response.status === 201) {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const sendEnterPassword = createAsyncThunk(
  "user/sendEnterPassword",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await allAPIs.enter_password(userData);
      console.log("enter password", response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

// ==========SignIn============
export const sendSignIn = createAsyncThunk(
  "user/sendSignIn",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await allAPIs.signIn(userData);
      console.log("response", response);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// =======ResetPassword===
export const sendResetPassword = createAsyncThunk(
  "user/sendResetPassword",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await allAPIs.reset_password(userData);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const sendToken = createAsyncThunk("user/sendToken", async (token, { rejectWithValue }) => {
  try {
    const response = await allAPIs.sendToken(token);
    return response.data;
  } catch (error) {
    console.log("error token", error);
    return rejectWithValue(error.response.data.error);
  }
});

const initialState = {
  isLoading: false,
  email: null,
  error: null,
  user: null,
  refreshToken: null,
  accessToken: null,
  id: null,
  role: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setRefreshToken(state, action) {
      state.refreshToken = action.payload;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      // ===== signUp
      .addCase(sendSignUp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendSignUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.email = action.payload.user;
      })
      .addCase(sendSignUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })

      .addCase(sendVerifyEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendVerifyEmail.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(sendVerifyEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(sendEnterPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendEnterPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.email = action.payload.user;
        state.id = action.payload.id;
        state.role = action.payload.role;
      })
      .addCase(sendEnterPassword.rejected, (state) => {
        state.isLoading = false;
        state.error = null;
      })

      // =====signIn
      .addCase(sendSignIn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendSignIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.email = action.payload.user;
        state.id = action.payload.id;
        state.role = action.payload.role;
      })
      .addCase(sendSignIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // =====ResetPassword====

      .addCase(sendResetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendResetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.email = action.payload.user;
      })
      .addCase(sendResetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })

      .addCase(sendToken.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.role = action.payload.role;
      })
      .addCase(sendToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = null;
      });
  },
});

export const { setRefreshToken, setAccessToken } = userSlice.actions;
export default userSlice.reducer;
