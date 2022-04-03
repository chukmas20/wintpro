import axios from "axios";
import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS } from "../constants/userConstants";


// Login
export const login = (email, password) => async(dispatch) =>{
    try {
         dispatch({type: LOGIN_REQUEST})

        const config = {
              headers:{
                "Content-Type": "application/json"
              }
        }

         const {data} = await axios.post(`/api/v1/login`, {email, password}
          ,
         config
     );
        dispatch({ type: LOGIN_SUCCESS, payload: data.user})
        
    } catch (error) {
          dispatch({ type:LOGIN_FAIL, payload: error.response.data.message})
    }
}

// Register
export const register = (name,email,password) => async(dispatch) =>{
  try {
       dispatch({type: REGISTER_USER_REQUEST})
       
       const config = {
         headers:{
          'Content-Type':'application/json'
        }
      }
      const {data} = await axios.post('/api/v1/register', {name, email,password}, config)
      console.log(data)
      dispatch({ type: REGISTER_USER_SUCCESS, payload:data.user})
        
    } catch (error) {
       dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.message})

  }
}



export const logout = () => async(dispatch) =>{
  try {
          await axios.get(`/api/v1/logout`);

      dispatch({ type: LOGOUT_SUCCESS})
      
  } catch (error) {
        dispatch({ type:LOGOUT_FAIL, payload: error.response.data.message})
  }
}