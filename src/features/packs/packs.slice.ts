import { createSlice } from "@reduxjs/toolkit";
import { AddPack, CardPacks, GetPacks, GetPacksPayload, packsApi, UpdatePack } from "features/packs/packs.api";
import { createAppAsyncThunk, thunkTryCatch } from "common/utils";
import { loadState } from "helpers/localStorage";
import { authThunks } from "features/auth/auth.slice";

export const packsInitialState: GetPacks = {
  cardPacks: [] as CardPacks[],
  cardPacksTotalCount: null as null | number,
  maxCardsCount: null as null | number,
  minCardsCount: null as null | number,
  page: null as null | number,
  pageCount: null as null | number,
  token: null as null | string,
  tokenDeathTime: null as null | number,
};

const slice = createSlice({
  name: "packs",
  initialState: packsInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPacks.fulfilled, (state, action) => {
      Object.assign(state, action.payload);
    });
  },
});

const getPacks = createAppAsyncThunk<any, GetPacksPayload>("packs/getPacks", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const { dispatch, rejectWithValue } = thunkAPI;
    let res = await packsApi.getPacks(arg);
    dispatch(authThunks.authMe());
    return res.data;
  });
});

//; setDisabled: (disabled: boolean) => void

const addPack = createAppAsyncThunk<any, { userIDfromProfile: string; payload: { cardsPack: AddPack } }>(
  "packs/addPack",
  async (arg, thunkAPI) => {
    // arg.setDisabled(true);
    return thunkTryCatch(thunkAPI, async () => {
      const payload: { cardsPack: AddPack } = arg.payload;
      const { dispatch, rejectWithValue } = thunkAPI;
      await packsApi.addPack(payload);
      dispatch(getPacks(loadState() ? { user_id: arg.userIDfromProfile, pageCount: 8 } : { pageCount: 8 }));
      //  arg.setDisabled(false);
    });
  }
);

const deletePack = createAppAsyncThunk<string, { idForDelete: string; userID: string }>(
  "packs/deletePack",
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      console.log(arg);
      const { dispatch, rejectWithValue } = thunkAPI;
      await packsApi.deletePack(arg.idForDelete);
      dispatch(getPacks(loadState() ? { user_id: arg.userID, pageCount: 8 } : { pageCount: 8 })); //свои колоды/не свои
    });
  }
);

const updatePack = createAppAsyncThunk<{ payload: UpdatePack; userID: string }, any>(
  "packs/updatePack",
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const { dispatch, rejectWithValue } = thunkAPI;
      await packsApi.updatePack(arg.payload);
      dispatch(getPacks(loadState() ? { user_id: arg.userID, pageCount: 8 } : { pageCount: 8 }));
    });
  }
);

// const updatePack = createAppAsyncThunk<UpdatePack, any>("packs/updatePack", async (arg, thunkAPI) => {
//   return thunkTryCatch(thunkAPI, async () => {
//     const { dispatch, rejectWithValue } = thunkAPI;
//     await packsApi.updatePack(arg);
//     dispatch(getPacks({ pageCount: 8 }));
//   });
// });

export const packsReducer = slice.reducer;
export const packsActions = slice.actions;
export const packsThunks = { getPacks, addPack, deletePack, updatePack };
