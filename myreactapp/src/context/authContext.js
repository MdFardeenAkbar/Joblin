//import { decode } from 'jsonwebtoken';
import React , { useReducer , createContext} from 'react';
import { jwtDecode } from 'jwt-decode';



const initialState = {
    user: null
}

if(localStorage.getItem("token")) {
    console.log("spot1")
    const decodedToken = jwtDecode(localStorage.getItem("token"));
    if(decodedToken.exp*1000<Date.now()) {
        console.log("spot2")
        localStorage.removeItem("token");
    }
    else {
        console.log("spot3")
        initialState.user = decodedToken;
    }
}

const AuthContext = createContext({
    user:null,
    login: (userData) => {},
    logout: () => {}
});

function authReducer(state, action) {
    console.log("spot4")
    switch(action.type) {
        case 'LOGIN':
            console.log("spot5")
            return {
                ...state,
                user: action.payload
            }
        case 'LOGOUT':
            console.log("spot6")
            return {
                ...state,
                user:null
            }
        default:
            return state;
    }
}

function AuthProvider(props) {
    console.log("spot7")
    const [state, dispatch] = useReducer(authReducer,initialState);

    const login = (userData) => {
        console.log("spot8")
        console.log(userData)
        localStorage.setItem("token", userData.token);
        dispatch({
            type: 'LOGIN',
            payload: userData
        });
    }
    function logout() {
        localStorage.removeItem("token");
        dispatch({ type: 'LOGOUT'});
    }

    return (
        <AuthContext.Provider
            value={{user: state.user,login,logout}}
            {...props}
        />
    )
}

export {AuthContext, AuthProvider};