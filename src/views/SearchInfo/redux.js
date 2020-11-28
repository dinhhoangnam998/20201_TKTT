const { createSlice } = require("@reduxjs/toolkit");

const searchResultSlice = createSlice({
  name: "searchResultSlice",
  initialState: { results: [] },
  reducers: {
    setResults: (state, action) => {
      state.results = action.payload;
    },
  },
});

export default searchResultSlice.reducer;
export const { setResults } = searchResultSlice.actions;
