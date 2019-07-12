import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
    currentUser: null
}

//for first argument in userReducer state = ??? adds 
// a value if there is not one initially

const userReducer = (state = INITIAL_STATE, action) => {
    const {...type} = UserActionTypes;
    
    switch (action.type) {
    case type.SET_CURRENT_USER:
        return {
            ...state,
            currentUser: action.payload
        }


    default:
        return state;
}

}

export default userReducer;
