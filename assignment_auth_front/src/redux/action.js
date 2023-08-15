import { 
	SET_USER,
	SET_LOADER,
	SET_AUTH,
 } from "./reducer";

export const setUser = (user) => {
	return({
		type: SET_USER,
		payload:user
	})
}

export const setLoader = (loaderState) => {
	return ({
		type:SET_LOADER,
		payload:loaderState
	})
}


export const setAuth = (authState) => {
	return({
		type:SET_AUTH,
		payload: authState
	})
}