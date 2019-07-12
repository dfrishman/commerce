const INITIAL_STATE = {
    currentUser: null
}

//for first argument in userReducer state = ??? adds 
// a value if there is not one initially

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case 'SET_CURRENT_USER':
        return {
            ...state,
            currentUser: action.payload
        }


    default:
        return state;
}

}

export default userReducer;
