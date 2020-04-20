import {combineReducers} from 'redux';

import user from './user_reducer';
import chat from './chat_reducer';

const Reducer = combineReducers({
    user,
    chat
})

export default Reducer;
