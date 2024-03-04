import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import allAPIs from "../../services/API";

export const getAllVacancy = createAsyncThunk(
  "vacancy/getAllVacancy",
  async (value = "", { rejectWithValue }) => {
    try {
      const response = await allAPIs.getAllVacancy(value);
      if (response.status !== 200) {
        throw new Error("Server Error, unable to sign in");
      }
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const send_create_vacancy = createAsyncThunk(
  "companyDetails/send_create_vacancy",
  async (data, { rejectWithValue }) => {
    try {
      const response = await allAPIs.send_create_vacancy(data);
      if (response.status !== 201) {
        throw new Error("Server Error, unable to sign in");
      }
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const getVacancyEmployer = createAsyncThunk(
  "vacancy/getVacancyEmployer",
  async (_, { rejectWithValue }) => {
    try {
      const response = await allAPIs.getVacancyEmployer();
      if (response.status !== 200) {
        throw new Error("Server Error, unable to sign in");
      }

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const getVacancyDetail = createAsyncThunk(
  "vacancy/getVacancyDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await allAPIs.getVacancyDetail(id);
      if (response.status !== 200) {
        throw new Error("Server Error, unable to sign in");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

// editVacancy
export const editVacancy = createAsyncThunk(
  "vacancy/editVacancy",
  async ([id, data], { rejectWithValue }) => {
    try {
      const response = await allAPIs.editVacancy(id, data);
      if (response.status !== 200) {
        throw new Error("Server Error, unable to sign in");
      }
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
  allVacancy: [],
  vacancyEmployer: [],
  detailVacancy: {},
};

const vacancySlice = createSlice({
  name: "vacancy",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllVacancy.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllVacancy.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allVacancy = action.payload;
      })
      .addCase(getAllVacancy.rejected, (state) => {
        state.isLoading = false;
        state.error = null;
      })

      .addCase(getVacancyEmployer.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getVacancyEmployer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.vacancyEmployer = action.payload;
      })
      .addCase(getVacancyEmployer.rejected, (state) => {
        state.isLoading = false;
        state.vacancyEmployer = [];
        state.error = null;
      })

      .addCase(getVacancyDetail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getVacancyDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.detailVacancy = action.payload;
      })
      .addCase(getVacancyDetail.rejected, (state) => {
        state.isLoading = false;
        state.error = null;
      })

      .addCase(send_create_vacancy.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(send_create_vacancy.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(send_create_vacancy.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(editVacancy.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editVacancy.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(editVacancy.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const {} = vacancySlice.actions;
export default vacancySlice.reducer;
