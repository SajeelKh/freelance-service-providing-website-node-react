import { alertActions } from './';
import { userConstants } from '../constants/user-constants';
import { userServices } from '../services';

const login = (username, password) => async (dispatch) => {
    const request = (user) => ({ type: userConstants.LOGIN_REQUEST, user }); 
    const success = (user) => ({ type: userConstants.LOGIN_SUCCESS, user });
    const failure = (err) => ({ type: userConstants.LOGIN_FAILURE, err });

    dispatch(request({username}));

    try{
        let user = await userServices.login(username, password);
        dispatch(success(user));
    }
    catch(err) {
        dispatch(failure(err));
        dispatch(alertActions.error(err));
    }
}

const logout = () => {
    userServices.logout();
    return {
        type: userConstants.LOGOUT,
    };
}

const getAll = () => async (dispatch) => {
    const request = () => ({ type: userConstants.GETALL_REQUEST });
    const success = (users) => ({ type: userConstants.GETALL_SUCCESS, users });
    const failure = (err) => ({ type: userConstants.GETALL_FAILURE, err });

    dispatch(request());

    try {
        let users = await userServices.getAll()
        dispatch(success(users));
    }
    catch(err) {
        dispatch(failure(err));
        dispatch(alertActions.error(err));
    }
}

export const userActions = {
    login,
    logout,
    getAll,
};