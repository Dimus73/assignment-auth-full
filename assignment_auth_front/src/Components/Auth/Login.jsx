import {useDispatch} from 'react-redux'
import {setAuth, setUser} from '../../redux/action';
import {useNavigate} from 'react-router-dom';
import './Login.css'
import {useEffect, useState} from "react";
import WindowsSection from "./UI/WindowsSection";
import InputElement from "./UI/InputElement";
import {useFetching} from "../Hooks/useFetching";
import AuthServices from "../API/authServices";
import ModalWindow from "../UI/Modal/ModalWindow";


const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [modalMessage, setModalMessage] = useState('');

	const [loginAction, loginActionMessageError, loginActionClearMessageError] =
		useFetching (async (email, pw) => {
			const response = await AuthServices.login( email, pw );
			dispatch(setAuth(true))
			dispatch(setUser(
				{
					id : response.data.id,
					email : response.data.email,
				})
			)
			localStorage.setItem( 'token', response.data.access_token )
			navigate( '/' )
		})

	useEffect(() => {
		setModalMessage(
			loginActionMessageError
		)
	},[loginActionMessageError])

	const logInFunction = async (e) => {
		e.preventDefault()

		await loginAction(login,password);
	}

	const clearAllMessages = () => {
		if (loginActionMessageError) loginActionClearMessageError();
		setModalMessage('');
	}


	return (
		<>
			{modalMessage &&
				<ModalWindow title={'Error'} body={modalMessage} closeAction={clearAllMessages}/>}
			<WindowsSection title={'Enter email and password'} action={logInFunction} buttonName={'Sign in'}>
				<InputElement i={1} value={login} placeholder={'Email'} type={'text'} element={login} changeElement={setLogin}/>
				<InputElement i={2} value={password} placeholder={'Password'} type={'password'} element={password} changeElement={setPassword}/>
			</WindowsSection>
		</>
	)
}

export default Login