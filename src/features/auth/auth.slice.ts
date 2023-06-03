import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ArgLoginType,
  ArgRegisterType,
  authApi,
  ForgetPasswordType,
  ProfileType,
  SetNewPasType,
  UpdateProfileType,
} from "features/auth/auth.api";
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk";
import { SetNewPassword } from "features/auth/SetNewPassword";

const slice = createSlice({
  name: "auth",
  initialState: {
    profile: null as ProfileType | null,
    registred: false as boolean,
    emailSended: false as boolean,
    email: null as null | string,
    goToLogin: false as boolean,
  },
  reducers: {
    // setProfile: (state, action: PayloadAction<{ profile: ProfileType }>) => {
    //   state.profile = action.payload.profile;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.profile = action.payload.profile;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.registred = action.payload.registred;
    });
    builder.addCase(forgetpassword.fulfilled, (state, action) => {
      state.emailSended = action.payload.emailSended;
      state.email = action.payload.email;
    });
    builder.addCase(setNewPas.fulfilled, (state, action) => {
      state.goToLogin = action.payload.goToLogin;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.goToLogin = action.payload.goToLogin;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.profile = action.payload.profile;
    });
  },
});

const register = createAsyncThunk<{ registred: boolean }, { payload: ArgRegisterType }>(
  "auth/register",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      let res = await authApi.register(arg.payload);
      return { registred: true };
    } catch (e) {
      return rejectWithValue(null);
    }
  }
);
const login = createAppAsyncThunk<{ profile: ProfileType }, ArgLoginType>("auth/login", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    let res = await authApi.login(arg);
    return { profile: res.data };
  } catch (e) {
    return rejectWithValue(null);
  }
});
const logout = createAsyncThunk<{ goToLogin: boolean }, void>("auth/logout", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    await authApi.logout();
    return { goToLogin: true };
  } catch (e) {
    return rejectWithValue(null);
  }
});
const forgetpassword = createAsyncThunk<{ emailSended: boolean; email: string }, ForgetPasswordType>(
  "auth/forget",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      await authApi.forget(arg);
      return { emailSended: true, email: arg.email };
    } catch (e) {
      return rejectWithValue(null);
    }
  }
);
const setNewPas = createAsyncThunk<{ goToLogin: boolean }, SetNewPasType>("auth/setNewPas", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    console.log(arg);
    await authApi.setNewPas(arg);
    return { goToLogin: true };
  } catch (e) {
    return rejectWithValue(null);
  }
});

const updateProfile = createAsyncThunk<{ profile: ProfileType }, { payload: UpdateProfileType }>(
  "auth/updateProfile",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      const res = await authApi.updateProfile(arg.payload);
      console.log(res.data.updatedUser);
      return { profile: res.data.updatedUser };
    } catch (e) {
      return rejectWithValue(null);
    }
  }
);

export const authReducer = slice.reducer;
export const authActions = slice.actions;
export const authThunks = { register, login, forgetpassword, setNewPas, logout, updateProfile };

//----------------------------------------------------------------------------------------------------

// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { ArgLoginType, ArgRegisterType, authApi, ProfileType } from "features/auth/auth.api";
//
// const register = createAsyncThunk<any, any>("auth/register", (arg: ArgRegisterType, thunkAPI) => {
//   authApi.register(arg).then((res) => {
//     console.log(res.data.addedUser);
//   });
// });
//
// const login = createAsyncThunk<any, any>("auth/login", (arg: ArgLoginType, thunkAPI) => {
//   const { dispatch } = thunkAPI;
//   authApi.login(arg).then((res) => {
//     dispatch(authActions.setProfile({ profile: res.data }));
//   });
// });
//
// const slice = createSlice({
//   name: "auth",
//   initialState: {
//     profile: null as ProfileType | null,
//   },
//   reducers: {
//     setProfile: (state, action: PayloadAction<{ profile: ProfileType }>) => {
//       state.profile = action.payload.profile;
//     },
//   },
// });
//
// export const authReducer = slice.reducer;
// export const authActions = slice.actions;
// export const authThunks = { register, login };
