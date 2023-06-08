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
import { appActions } from "app/app.slice";
import { thunkTryCatch } from "common/componentsSmall/thunk-try-catch";

const slice = createSlice({
  name: "auth",
  initialState: {
    profile: null as ProfileType | null,
    registred: false as boolean,
    // error: null as null | string | undefined,
    emailSended: false as boolean,
    email: null as null | string,
    goToLogin: false as boolean,
  },
  reducers: {
    setGoToLogin: (state, action: PayloadAction<{ goToLogin: boolean }>) => {
      state.goToLogin = action.payload.goToLogin;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      //builder.addCase(login.rejected, (state, action) => {
      // state.error = action.payload;   // мы сделали универсальный для всех кейсов
      // });

      .addCase(register.fulfilled, (state, action) => {
        state.registred = true;
      })
      .addCase(forgetpassword.fulfilled, (state, action) => {
        debugger;
        state.emailSended = action.payload.emailSended;
        state.email = action.payload.email;
      })
      //раньше шло в экстраредюсеры, но из-за дублирования кода пришлось избавиться
      // builder.addCase(setNewPas.fulfilled, (state, action) => {
      //   state.goToLogin = action.payload.goToLogin;
      // });
      // builder.addCase(logout.fulfilled, (state, action) => {
      //   state.goToLogin = action.payload.goToLogin;
      // });
      .addCase(updateProfile.fulfilled, (state, action) => {
        debugger;
        state.profile = action.payload;
      });
  },
});

// const _register = createAppAsyncThunk<{ registred: boolean }, ArgRegisterType>(
//   "auth/register",
//   async (arg, thunkAPI) => {
//     const { dispatch, rejectWithValue } = thunkAPI;
//     try {
//       let res = await authApi.register(arg);
//       return { registred: true };
//     } catch (e: any) {
//       const error = e.response ? e.response.data.error : e.message;
//       dispatch(appActions.setError({ error }));
//       return rejectWithValue(null);
//     }
//   }
// );

const register = createAppAsyncThunk<void, ArgRegisterType>("auth/register", async (arg: ArgRegisterType, thunkAPI) => {
  await thunkTryCatch(thunkAPI, async () => {
    await authApi.register(arg);
  });
});

// const login = createAppAsyncThunk<{ profile: ProfileType }, ArgLoginType>("auth/login", async (arg, thunkAPI) => {
//   const { dispatch, rejectWithValue } = thunkAPI;
//   console.log(arg);
//   try {
//     let res = await authApi.login(arg);
//     return { profile: res.data };
//   } catch (e: any) {
//     // мы сделали вместо него универсальный для всех кейсов
//     //return rejectWithValue(e.response.data.error);
//     //---------------------------------------------------
//     // dispatch(appActions.setError({ error: e.response.data.error }));
//     // return rejectWithValue(null);
//     //--------------------------------------------------
//     // if (e.response) {
//     //   //если есть тырнет
//     //   dispatch(appActions.setError({ error: e.response.data.error }));
//     //   return rejectWithValue(null);
//     // } else {
//     //   //если нет тырнета
//     //   dispatch(appActions.setError({ error: e.message }));
//     //   return rejectWithValue(null);
//     // }
//     //-----------------------------------------------
//     const error = e.response ? e.response.data.error : e.message;
//     dispatch(appActions.setError({ error }));
//     return rejectWithValue(null);
//   }
// });

const login = createAppAsyncThunk<ProfileType, ArgLoginType>("auth/login", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    return await authApi.login(arg);
  });
});

const logout = createAppAsyncThunk<void, void>("auth/logout", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const { dispatch, rejectWithValue } = thunkAPI;
    await authApi.logout();
    dispatch(authActions.setGoToLogin({ goToLogin: true }));
  });
});

// const logout = createAsyncThunk<void, void>("auth/logout", async (arg, thunkAPI) => {
//   const { dispatch, rejectWithValue } = thunkAPI;
//   try {
//     await authApi.logout();
//     dispatch(authActions.setGoToLogin({ goToLogin: true }));
//     // return { goToLogin: true };   //раньше шло в экстраредюсеры, но из-за дублирования кода пришлось избавиться
//   } catch (e) {
//     return rejectWithValue(null);
//   }
// });

const forgetpassword = createAppAsyncThunk<{ emailSended: boolean; email: string }, ForgetPasswordType>(
  "auth/forget",
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      await authApi.forget(arg);
      return { emailSended: true, email: arg.email };
    });
  }
);

// const forgetpassword = createAsyncThunk<{ emailSended: boolean; email: string }, ForgetPasswordType>(
//   "auth/forget",
//   async (arg, thunkAPI) => {
//     const { dispatch, rejectWithValue } = thunkAPI;
//     try {
//       await authApi.forget(arg);
//       return { emailSended: true, email: arg.email };
//     } catch (e) {
//       return rejectWithValue(null);
//     }
//   }
// );

const setNewPas = createAppAsyncThunk<void, SetNewPasType>("auth/setNewPas", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const { dispatch, rejectWithValue } = thunkAPI;
    await authApi.setNewPas(arg);
    dispatch(authActions.setGoToLogin({ goToLogin: true }));
  });
});

// const setNewPas = createAsyncThunk<void, SetNewPasType>("auth/setNewPas", async (arg, thunkAPI) => {
//   const { dispatch, rejectWithValue } = thunkAPI;
//   try {
//     console.log(arg);
//     await authApi.setNewPas(arg);
//     dispatch(authActions.setGoToLogin({ goToLogin: true }));
//     //return { goToLogin: true }; //раньше шло в экстраредюсеры, но из-за дублирования кода пришлось избавиться
//   } catch (e) {
//     return rejectWithValue(null);
//   }
// });

const updateProfile = createAppAsyncThunk<ProfileType, { payload: UpdateProfileType }>(
  "auth/updateProfile",
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      return await authApi.updateProfile(arg.payload);
    });
  }
);

// const updateProfile = createAsyncThunk<{ profile: ProfileType }, { payload: UpdateProfileType }>(
//   "auth/updateProfile",
//   async (arg, thunkAPI) => {
//     const { dispatch, rejectWithValue } = thunkAPI;
//     try {
//       const res = await authApi.updateProfile(arg.payload);
//       return { profile: res.data.updatedUser };
//     } catch (e) {
//       return rejectWithValue(null);
//     }
//   }
// );

export const authReducer = slice.reducer;
export const authActions = slice.actions;
export const authThunks = { register, login, forgetpassword, setNewPas, logout, updateProfile };
