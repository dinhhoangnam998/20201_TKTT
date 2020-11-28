const { createSlice } = require("@reduxjs/toolkit");

const searchResultSlice = createSlice({
  name: "searchResultSlice",
  initialState: { results: [], QTime: 0, showResHeader: false },
  reducers: {
    setResponse: (state, action) => {
      state.results = action.payload.results;
      state.QTime = action.payload.QTime;
      state.showResHeader = action.payload.showResHeader;
    },
  },
});

export default searchResultSlice.reducer;
export const { setResponse } = searchResultSlice.actions;
