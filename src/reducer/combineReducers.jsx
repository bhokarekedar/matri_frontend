import { combineReducers } from 'redux';
import { configReducer } from '../saga/config/configReducer';
import { commonReducer } from '../saga/common/commonReducer';
import { registrationReducer } from '../saga/registration/registrationReducer';
import { profileReducer } from '../saga/profile/profileReducer';

// Combine all your reducers into a single rootReducer
const rootReducer = combineReducers({
    common: commonReducer,
    config: configReducer,
    registration: registrationReducer,
    profile:  profileReducer
  
});

export default rootReducer;