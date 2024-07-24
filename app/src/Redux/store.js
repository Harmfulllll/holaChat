import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import conversationReducer from "./conversationSlice.js";
import socketReducer from "./socketSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    conversation: conversationReducer,
    socket: socketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
