import { combineReducers } from 'redux';
import { configReducer } from '../saga/config/configReducer';
import { commonReducer } from '../saga/common/commonReducer';
import { registrationReducer } from '../saga/registration/registrationReducer';

// Combine all your reducers into a single rootReducer
const rootReducer = combineReducers({
    common: commonReducer,
    config: configReducer,
    registration: registrationReducer
  
});

export default rootReducer;