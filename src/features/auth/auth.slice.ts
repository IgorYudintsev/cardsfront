import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ArgLoginType, ArgRegisterType, authApi, ForgetPasswordType, ProfileType } from "features/auth/auth.api";
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk";

const slice = createSlice({
  name: "auth",
  initialState: {
    profile: null as ProfileType | null,
    registred: false as boolean,
    emailSended: false as boolean,
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

// const forgetpassword = createAsyncThunk<any, ForgetPasswordType>("auth/forget", async (arg, thunkAPI) => {
//   const { dispatch, rejectWithValue } = thunkAPI;
//   try {
//     let res = await authApi.forget(arg);
//     // return login(res.data);
//     return login(res.data);
//   } catch (e) {
//     return rejectWithValue(null);
//   }
// });

const forgetpassword = createAsyncThunk<{ emailSended: boolean }, ForgetPasswordType>(
  "auth/forget",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      await authApi.forget(arg);
      return { emailSended: true };
      // return login(res.data);
      //return login(res.data);
    } catch (e) {
      return rejectWithValue(null);
    }
  }
);

export const authReducer = slice.reducer;
export const authActions = slice.actions;
export const authThunks = { register, login, forgetpassword };

//----------------------------------------------------------------------------------------------------

// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { ArgLoginType, ArgRegisterType, authApi, ForgetPasswordType, ProfileType } from "features/auth/auth.api";
// import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk";
//
// const slice = createSlice({
//   name: "auth",
//   initialState: {
//     profile: null as ProfileType | null,
//     registred: false as boolean,
//     emailSended: false as boolean
//   },
//   reducers: {
//     // setProfile: (state, action: PayloadAction<{ profile: ProfileType }>) => {
//     //   state.profile = action.payload.profile;
//     // },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(login.fulfilled, (state, action) => {
//       state.profile = action.payload.profile;
//     });
//     builder.addCase(register.fulfilled, (state, action) => {
//       state.registred = action.payload.registred;
//     });
//   },
// });
//
// const register = createAsyncThunk<{ registred: boolean }, { payload: ArgRegisterType }>(
//     "auth/register",
//     async (arg, thunkAPI) => {
//       const { dispatch, rejectWithValue } = thunkAPI;
//       try {
//         let res = await authApi.register(arg.payload);
//         return { registred: true };
//         // return console.log(res.data.addedUser);
//       } catch (e) {
//         return rejectWithValue(null);
//       }
//     }
// );
//
// const login = createAppAsyncThunk<{ profile: ProfileType }, ArgLoginType>("auth/login", async (arg, thunkAPI) => {
//   const { dispatch, rejectWithValue } = thunkAPI;
//   try {
//     let res = await authApi.login(arg);
//     return { profile: res.data };
//   } catch (e) {
//     return rejectWithValue(null);
//   }
// });
//
// const forgetpassword = createAsyncThunk<any, ForgetPasswordType>("auth/forget", async (arg, thunkAPI) => {
//   const { dispatch, rejectWithValue } = thunkAPI;
//   try {
//     let res = await authApi.forget(arg);
//     return login(res.data);
//   } catch (e) {
//     return rejectWithValue(null);
//   }
// });
//
// export const authReducer = slice.reducer;
// export const authActions = slice.actions;
// export const authThunks = { register, login, forgetpassword };

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
