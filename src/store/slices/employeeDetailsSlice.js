import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import allAPIs from "../../services/API";

export const sendDataEmployee = createAsyncThunk(
  "employeeDetails/sendDataEmployee",
  async (data, { rejectWithValue }) => {
    try {
      const response = await allAPIs.sendDataEmployee(data);
      if (response.status !== 201) {
        throw new Error("Server Error, unable to sign in");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const getAllEmployee = createAsyncThunk(
  "employeeDetails/getAllEmployee",
  async (_, { rejectWithValue }) => {
    try {
      const response = await allAPIs.getAllEmployee();
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//detail
export const getEmployeeDetail = createAsyncThunk(
  "employeeDetails/getEmployeeDetail",
  async (id, { rejectWithValue }) => {
    console.log(id);
    try {
      const response = await allAPIs.getEmployeeDetail(id);
      console.log(response);
      return response.data[0];
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const sendInvitation = createAsyncThunk(
  "employeeDetails/sendInvitation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await allAPIs.sendInvitation(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const getInvitation = createAsyncThunk(
  "employeeDetails/getInvitation",
  async (_, { rejectWithValue }) => {
    try {
      const response = await allAPIs.getInvitation();
      if (response.status !== 200) {
        throw new Error("Server Error, unable to sign in");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);
export const sendInterviews = createAsyncThunk(
  "employeeDetails/sendInterviews",
  async (id, { rejectWithValue }) => {
    try {
      const response = await allAPIs.sendInterviews(id);
      console.log(response);
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const getFavorite = createAsyncThunk(
  "employeeDetails/getFavorite",
  async (_, { rejectWithValue }) => {
    try {
      const response = await allAPIs.getFavariteStudent();
      if (response.status !== 200) {
        throw new Error("Server Error, unable to sign in");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const SendFavorite = createAsyncThunk(
  "employeeDetails/SendFavorite",
  async (id, { rejectWithValue }) => {
    try {
      const response = await allAPIs.sendFavorite(id);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.error);
    }
  }
);

// getEmployeeFilter
export const getEmployeeFilter = createAsyncThunk(
  "employeeDetails/getEmployeeFilter",
  async (id, { rejectWithValue }) => {
    try {
      const response = await allAPIs.getEmployeeFilter(id);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.error);
    }
  }
);

// interview

export const getInterviewList = createAsyncThunk(
  "employeeDetails/getInterviewList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await allAPIs.getInterView();
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.error);
    }
  }
);

const initialState = {
  isLoading: false,
  error: null,
  employee: [],
  employeeFilter: [],
  detailEmployee: {},
  invitation: [],
  favorite: [],
  interview: [],
};

const employeeDetailsSlice = createSlice({
  name: "employeeDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllEmployee.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.employee = action.payload;
      })
      .addCase(getAllEmployee.rejected, (state) => {
        state.isLoading = false;
        state.error = null;
      })

      .addCase(getEmployeeFilter.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getEmployeeFilter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.employee = action.payload;
      })
      .addCase(getEmployeeFilter.rejected, (state) => {
        state.isLoading = false;
        state.error = null;
      })

      .addCase(getFavorite.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFavorite.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favorite = action.payload;
      })
      .addCase(getFavorite.rejected, (state) => {
        state.isLoading = false;
        state.error = null;
      })

      .addCase(getEmployeeDetail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getEmployeeDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.detailEmployee = action.payload;
      })
      .addCase(getEmployeeDetail.rejected, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      // getInvitation
      .addCase(getInvitation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getInvitation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.invitation = action.payload;
      })
      .addCase(getInvitation.rejected, (state) => {
        state.isLoading = false;
        state.error = null;
      })

      .addCase(sendInvitation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendInvitation.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(sendInvitation.rejected, (state) => {
        state.isLoading = false;
      })
    
     .addCase(getInterviewList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInterviewList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.interview = action.payload;
      })
      .addCase(getInterviewList.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { } = employeeDetailsSlice.actions;
export default employeeDetailsSlice.reducer;
