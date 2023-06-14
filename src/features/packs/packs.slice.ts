import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardPacks, GetPacks, packsApi } from "features/packs/packs.api";
import { createAppAsyncThunk, thunkTryCatch } from "common/utils";
import { ArgLoginType, authApi, ProfileType } from "features/auth/auth.api";

const packsInitialState: GetPacks = {
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
      return (state = action.payload);
    });
  },
});

const getPacks = createAppAsyncThunk<any>("packs/getPacks", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    let res = await packsApi.getPacks();
    console.log(res.data);
    return res.data;
  });
});

export const packsReducer = slice.reducer;
export const packsActions = slice.actions;
export const authThunks = { getPacks };
