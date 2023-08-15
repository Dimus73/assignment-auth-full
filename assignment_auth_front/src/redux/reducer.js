export const SET_USER = 'SET_USER'
export const SET_LOADER = 'SET_LOADER'
export const SET_AUTH = 'SET_AUTH'

let initState = ""
try {
	const localStorageData = localStorage.getItem('user');
	initState = { user:JSON.parse (localStorageData)}
	initState = ('username' in initState.user) ? initState :
		{
			user : { id:'',
					email:'',
			}
		}

	} catch (error) {
		initState = {
			user : { id:'',
					email:'',
				}
			}
	}

initState.loader = true;
initState.isAuth = false;

export const reducer = (state = initState, action = {}) => {
	switch (action.type){
		case SET_USER :
			return ( { ...state, user:action.payload } )
		case SET_LOADER :
			return ({ ...state, loader:action.payload })
		case SET_AUTH :
			return ({ ...state, isAuth: action.payload })
		default:
			return ({...state})

	}
}