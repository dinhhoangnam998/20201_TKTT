const { createSlice } = require("@reduxjs/toolkit");

const searchResultSlice = createSlice({
  name: "searchResultSlice",
  initialState: { results: [], numDocs: 0, qTime: 0 },
  reducers: {
    setResponse: (state, action) => {
      state.results = action.payload.docs;
    },
  },
});

export default searchResultSlice.reducer;
export const { setResponse } = searchResultSlice.actions;
