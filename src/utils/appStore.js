import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; 
import feedReducer from "./feedSlice"; 
import connectionReducer from "./connectionSlice";
import Connections from "../components/Connections";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionReducer,
  },
});

export default appStore;
