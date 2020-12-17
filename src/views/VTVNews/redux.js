const { createSlice } = require("@reduxjs/toolkit");

const searchResultSlice = createSlice({
  name: "searchResultSlice",
  initialState: { results: [], highlighting: null, QTime: 0, showSearchResultMetaBar: false },
  reducers: {
    setResponse: (state, action) => {
      const body = action.payload;
      state.QTime = body.responseHeader.QTime;
      state.results = body.response.docs;
      state.highlighting = body.highlighting;
      state.showSearchResultMetaBar = true;
    },
  },
});

export default searchResultSlice.reducer;
export const { setResponse } = searchResultSlice.actions;
