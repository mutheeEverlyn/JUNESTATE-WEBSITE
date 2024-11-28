import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { loginApi } from '../features/login/LoginApi';
import { registerApi } from '../features/register/RegisterApi';
import { usersAPI } from '../features/users_management/UsersApi';
import { LocationAPI } from '../features/location/LocationApi';
import { TicketAPI } from '../features/customer_suppport-tickets/TicketApi';
import { BookingsAPI } from '../features/houses/BookingsApi';
import { PaymentsAPI } from '../features/payments/PaymentsApi';
import { customerSupportAPI } from '../features/customer_suppport-tickets/CustomerSupportApi';
import { PaymentsInfoAPI } from '../features/payments/PaymentsInfoAPI';
import {HouseAPI} from '../features/houses/HouseApi'
//auth persist config
const persistConfig = {
  key: 'auth',
  storage,
}

//combine all reducers
const rootReducer = combineReducers({
  [loginApi.reducerPath]: loginApi.reducer,
  [registerApi.reducerPath]:registerApi.reducer,
  [usersAPI.reducerPath]: usersAPI.reducer,
  [LocationAPI.reducerPath]:LocationAPI.reducer,
  [TicketAPI.reducerPath]:TicketAPI.reducer,
 [BookingsAPI.reducerPath]:BookingsAPI.reducer,
 [customerSupportAPI.reducerPath]:customerSupportAPI.reducer,
 [PaymentsAPI.reducerPath]:PaymentsAPI.reducer,
 [PaymentsInfoAPI.reducerPath]:PaymentsInfoAPI.reducer,
 [HouseAPI.reducerPath]:HouseAPI.reducer,
});

//apply pesist Reducer to only counter reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);
// store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck:{
        ignoredActions:['persist/PERSIST','persist/REHYDRATE'],
      },
    }).concat(loginApi.middleware).concat(registerApi.middleware)
    .concat(usersAPI.middleware).concat(LocationAPI.middleware).concat(TicketAPI.middleware)
    .concat(BookingsAPI.middleware).concat(customerSupportAPI.middleware).concat(PaymentsAPI.middleware)
    .concat(PaymentsInfoAPI.middleware).concat(HouseAPI.middleware)
});

export const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;