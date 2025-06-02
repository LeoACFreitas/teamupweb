import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './authSlice';
import requestReducer from './requestSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const store = configureStore({
  reducer: {
    auth: persistReducer(persistConfig, authReducer),
    request: requestReducer
  },
});

const persistor = persistStore(store);

export { store, persistor };
