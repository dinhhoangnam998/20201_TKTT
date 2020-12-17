import { configureStore } from "@reduxjs/toolkit";
import searchResultReducer from "./views/VTVNews/redux";
export default configureStore({
  reducer: { searchResultSlice: searchResultReducer },
});
