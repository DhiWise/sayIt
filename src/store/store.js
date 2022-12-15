import { configureStore,combineReducers } from '@reduxjs/toolkit';
import userReducer from '../reducers/userSlice';
import { persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const reducers = combineReducers({
    user:userReducer
})
const persistConfig={
    key :'root',
    storage
}

const persistedReducer = persistReducer(persistConfig,reducers);

export default configureStore({
  reducer: persistedReducer
});
