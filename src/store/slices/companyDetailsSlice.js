import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import allAPIs from "../../services/API";

export const sendCompanyData = createAsyncThunk(
  "companyDetails/sendCompanyData",
  async (data, { rejectWithValue }) => {
    try {
      const response = await allAPIs.sendCompanyData(data);
      if (response.status !== 201) {
        throw new Error("Server Error, unable to sign in");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const patchCompanyData = createAsyncThunk(
  "companyDetails/patchCompanyData",
  async (data, { rejectWithValue }) => {
    try {
      const response = await allAPIs.patchCompanyData(data);
      if (response.status !== 200) {
        throw new Error("Server Error, unable to sign in");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getCompanyData = createAsyncThunk(
  "companyDetails/getCompanyData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await allAPIs.getCompanyData();
      if (response.status !== 200) {
        throw new Error("Server Error, unable to sign in");
      }
      return response.data[0];
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const getMyBranch = createAsyncThunk(
  "companyDetails/getMyBranch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await allAPIs.getMyBranch();
      if (response.status !== 200) {
        throw new Error("Server Error, unable to sign in");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const getMyBranchDetail = createAsyncThunk(
  "companyDetails/getMyBranchDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await allAPIs.getMyBranchDetail(id);
      if (response.status !== 200) {
        throw new Error("Server Error, unable to sign in");
      }
      return response.data[0];
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const sendAddBranch = createAsyncThunk(
  "companyDetails/sendAddBranch",
  async (data, { rejectWithValue }) => {
    try {
      const response = await allAPIs.sendAddBranch(data);
      if (response.status !== 201) {
        throw new Error("Server Error, unable to sign in");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const patchBranchData = createAsyncThunk(
  "companyDetails/patchBranchData",
  async ([id, data], { rejectWithValue }) => {
    console.log(id, data);
    try {
      const response = await allAPIs.patchBranchData(id, data);
      if (response.status !== 200) {
        throw new Error("Server Error, unable to sign in");
      }
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const getCity = createAsyncThunk(
  "companyDetails/getCity",
  async (value, { rejectWithValue }) => {
    try {
      const response = await allAPIs.getCity(value);
      if (response.status !== 200) {
        throw new Error("Server Error, unable to sign in");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const getDataProfile = createAsyncThunk(
  "companyDetails/getDataProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await allAPIs.getDataProfile();
      if (response.status !== 200) {
        throw new Error("Server Error, unable to sign in");
      }
      return response.data[0];
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const sendPositionEmployee = createAsyncThunk(
  "companyDetails/sendPositionEmployee",
  async (data, { rejectWithValue }) => {
    try {
      const response = await allAPIs.sendPositionEmployee(data);
      if (response.status !== 201) {
        throw new Error("Server Error, unable to sign in");
      }
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);
export const getPositionEmployee = createAsyncThunk(
  "companyDetails/getPositionEmployee",
  async (_, { rejectWithValue }) => {
    try {
      const response = await allAPIs.getPositionEmployee();
      if (response.status !== 200) {
        throw new Error("Server Error, unable to sign in");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const deletePositionEmployee = createAsyncThunk(
  "companyDetails/deletePositionEmployee",
  async (id, { rejectWithValue }) => {
    try {
      const response = await allAPIs.deletePositionEmployee(id);
      if (response.status !== 204) {
        throw new Error("Server Error, unable to sign in");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

const initialState = {
  isLoading: false,
  error: null,
  detailCompany: {},
  branch: [],
  position: [],
  detailBranch: {},
  company_id: null,
  city: [],
  dataProfile: {},
};

const companyDetailsSlice = createSlice({
  name: "companyDetails",
  initialState,
  reducers: {
    // setStatus(state, action) {
    //     state.status = action.payload
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendCompanyData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendCompanyData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.company_id = action.payload.id;
      })
      .addCase(sendCompanyData.rejected, (state) => {
        state.isLoading = false;
        state.error = null;
      })

      .addCase(getCompanyData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCompanyData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.detailCompany = action.payload;
      })
      .addCase(getCompanyData.rejected, (state) => {
        state.isLoading = false;
        state.error = null;
      })

      .addCase(getMyBranch.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMyBranch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.branch = action.payload;
      })
      .addCase(getMyBranch.rejected, (state) => {
        state.isLoading = false;
        state.error = null;
      })

      .addCase(getMyBranchDetail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMyBranchDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.detailBranch = action.payload;
      })
      .addCase(getMyBranchDetail.rejected, (state) => {
        state.isLoading = false;
        state.error = null;
      })

      .addCase(getCity.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.city = action.payload;
      })
      .addCase(getCity.rejected, (state) => {
        state.isLoading = false;
        state.error = null;
      })

      .addCase(getDataProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getDataProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dataProfile = action.payload;
        state.company_id = action.payload?.id;
      })
      .addCase(getDataProfile.rejected, (state) => {
        state.isLoading = false;
        state.error = null;
      })

      .addCase(patchCompanyData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(patchCompanyData.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(patchCompanyData.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getPositionEmployee.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPositionEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.position = action.payload;
      })
      .addCase(getPositionEmployee.rejected, (state) => {
        state.isLoading = false;
        state.error = null;
      })

      .addCase(sendPositionEmployee.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendPositionEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(sendPositionEmployee.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const {} = companyDetailsSlice.actions;
export default companyDetailsSlice.reducer;