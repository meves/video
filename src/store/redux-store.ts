import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice"
import authReducer from "./authSlice"
import userReducer from "./userSlice"
import videoRecordReducer from "./videoRecordSlice"
import themeReducer from "./themeSlice"
import langReducer from "./langSlice"
import modalReducer from "./modalSlice"
import errorsReducer from "./errorSlice"


export const store = configureStore({
    reducer: {
      app: appReducer,
      auth: authReducer,
      user: userReducer,
      videoRecord: videoRecordReducer,
      theme: themeReducer,
      lang: langReducer,
      modal: modalReducer,
      errors: errorsReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          'videoRecord/setStream', 
          'videoRecord/setRecordedVideo',
        ],
        // Ignore these paths in the state
        ignoredPaths: [
          'videoRecord.stream',
          'videoRecord.recordedVideos'
        ],

      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type GetState = typeof store.getState