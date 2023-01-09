import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { HelpDeskApi } from "@/api/help-desk-api";
import { RootState } from "@/features/store";
import { ErrorResponse, HelpDesk } from "@/features/types";
import { helpDeskMapper } from "@/features/types/mappers/help-desk.mapper";
import { validateSimpleRequestResult } from "@/utils/funcs/validate-simple-request-result";
import { ReduxThunk } from "@/utils/types";

export type HelpDeskState = {
  pending: boolean;
};

const initialState: HelpDeskState = {
  pending: false,
};

export const sendQuestionAsync = createAsyncThunk<
  boolean,
  HelpDesk,
  ReduxThunk.RejectValue<ErrorResponse<HelpDesk>>
>("member/create", async (payload, { rejectWithValue }) => {
  const helpDeskDto = helpDeskMapper.toDto(payload);
  const result = await HelpDeskApi.sendQuestion(helpDeskDto);
  return validateSimpleRequestResult({
    rejectWithValue,
    result,
    mapper: helpDeskMapper,
  });
});

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendQuestionAsync.pending, (state) => {
        state.pending = true;
      })
      .addCase(sendQuestionAsync.fulfilled, (state) => {
        state.pending = false;
      })
      .addCase(sendQuestionAsync.rejected, (state) => {
        state.pending = false;
      });
  },
});
export const helpDeskStore = (state: RootState) => state.helpDesk;

export default commonSlice.reducer;
