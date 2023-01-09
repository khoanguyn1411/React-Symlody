import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { HelpDeskApi } from "@/api/help-desk-api";
import { RootState } from "@/features/store";
import { ErrorResponse, HelpDesk } from "@/features/types";
import { helpDeskMapper } from "@/features/types/mappers/help-desk.mapper";
import { ErrorHandler } from "@/utils/funcs/error-handler";
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
>("help-desk/send", async (payload, { rejectWithValue }) => {
  const helpDeskDto = helpDeskMapper.toDto(payload);
  const result = await HelpDeskApi.sendQuestion(helpDeskDto);
  if (result.kind === "ok") {
    return true;
  }
  return ErrorHandler.catchErrors({
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
