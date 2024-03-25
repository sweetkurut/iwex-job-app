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
  async (data, { rejectWithValue }) => {
    try {
      const response = await allAPIs.sendFavorite(data);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const DeleteFavorite = createAsyncThunk(
  "employeeDetails/DeleteFavorite",
  async (id, { rejectWithValue }) => {
    try {
      const response = await allAPIs.deleteFavorite(id);
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

export const sendInterviews = createAsyncThunk(
  "employeeDetails/sendInterviews",
  async (data, { rejectWithValue }) => {
    try {
      const response = await allAPIs.sendInterviews(data);
      console.log(response);
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getInterview = createAsyncThunk(
  "employeeDetails/getInterview",
  async (id, { rejectWithValue }) => {
    try {
      const response = await allAPIs.getInterview(id);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.error);
    }
  }
);


export const getInterview_staff = createAsyncThunk(
  "employeeDetails/getInterview_staff",
  async (id, { rejectWithValue }) => {
    try {
      const response = await allAPIs.getInterview_staff(id);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.error);
    }
  }
);
// staff profile students(id) / vacancies(id)

export const getAllProfilesStaffList = createAsyncThunk(
  "employeeDetails/getAllProfilesStaffList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await allAPIs.getAllProfilesStaff();
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const getProfileById = createAsyncThunk(
  "employeeDetails/getProfileById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await allAPIs.getProfileStaffById(id);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue;
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
  staff: [],
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

      .addCase(getInterview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInterview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.interview = action.payload;
      })
      .addCase(getInterview.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getInterview_staff.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInterview_staff.fulfilled, (state, action) => {
        state.isLoading = false;
        state.interview = action.payload;
      })
      .addCase(getInterview_staff.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getAllProfilesStaffList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProfilesStaffList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.employee = action.payload;
      })
      .addCase(getAllProfilesStaffList.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getProfileById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfileById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.detailEmployee = action.payload;
      })
      .addCase(getProfileById.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const {} = employeeDetailsSlice.actions;
export default employeeDetailsSlice.reducer;
