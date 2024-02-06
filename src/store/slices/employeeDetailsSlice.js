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
    try {
      const response = await allAPIs.getEmployeeDetail(id);
      return response.data[0];
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const sendInvitation = createAsyncThunk(
  "employeeDetails/sendInvitation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await allAPIs.sendInvitation(data);
      return response;
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

// getEmployeeFilter
export const getEmployeeFilter = createAsyncThunk(
  "employeeDetails/getEmployeeFilter",
  async (id, { rejectWithValue }) => {
    try {
      const response = await allAPIs.getEmployeeFilter(id);
      return response.data;
    } catch (error) {
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
      });
  },
});

export const {} = employeeDetailsSlice.actions;
export default employeeDetailsSlice.reducer;