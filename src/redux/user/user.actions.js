import { UserActionTypes } from './user.types';


export const setCurrentUser = user => {
const {...type} = UserActionTypes;
 
    return (
        {
            type: type.SET_CURRENT_USER,
            payload: user,
        }

    )
}