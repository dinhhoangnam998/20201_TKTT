import { configureStore } from "@reduxjs/toolkit";
import searchResultReducer from "./views/SearchInfo/redux";
export default configureStore({
  reducer: { searchResultSlice: searchResultReducer },
});
