import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {createLogger} from 'redux-logger'; 
import rootReducer from '../reducer/combineReducers';
import rootSaga from '../saga/saga';

const unCaughtErrorHandler= (errorInfo) => {
    console.log(`error from saga middleware, ${JSON.stringify(errorInfo)}`)
}

export default function configureStore(initialState){
const logger = createLogger();
const sagaMiddleware = createSagaMiddleware(
    {
        onError: unCaughtErrorHandler
    }
);
let middlewares;
if(process.env.REACT_APP_ENV === 'dev'){
    middlewares = applyMiddleware(sagaMiddleware, logger)
}else{
    middlewares = applyMiddleware(sagaMiddleware)
}
const store = createStore(
    rootReducer,
    initialState,
    middlewares
  );
// Run the root saga
sagaMiddleware.run(rootSaga);
return store;
}

