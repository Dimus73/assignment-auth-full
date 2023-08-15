import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './Registry.css'
import ModalWindow from "../UI/Modal/ModalWindow";
import WindowsSection from "./UI/WindowsSection";
import InputElement from "./UI/InputElement";
import {useFetching} from "../Hooks/useFetching";
import AuthServices from "../API/authServices";

const Registry = () => {

	const [email, setEmail] = useState('');
	const [password1, setPassword1] = useState('');
	const [password2, setPassword2] = useState('');
	const [modalMessage, setModalMessage] = useState('');
	const [modalTitle, setModalTitle] = useState('Error')

	const [registerAction, registerActionMessageError, registerActionClearMessageError] =
		useFetching (async (email, pw) => {
			await AuthServices.registration( email, pw );
			setEmail('');
			setPassword1('');
			setPassword2('')
			setModalTitle('Message:')
			setModalMessage('New user registered successfully');
		})

	useEffect(() => {
		setModalMessage(
			registerActionMessageError
		)
	},[registerActionMessageError])


	const addUser = async (e) => {
		e.preventDefault();

		if (password1 !== password2) {
			setModalMessage ('Password fields must match')
			return
		}
		await registerAction(email, password1);
	}


	const clearAllMessages = () => {
		if (registerActionMessageError) registerActionClearMessageError();
		setModalMessage('');
		setModalTitle('Error')
	}

	return (
		<>
			{modalMessage &&
				<ModalWindow title={modalTitle} body={modalMessage} closeAction={clearAllMessages}/>}
			<WindowsSection title={'Registry new user'} action={addUser} buttonName={'Registry'}>
				<InputElement i={1} value={email} placeholder={'Email'} type={'text'} element={email} changeElement={setEmail}/>
				<InputElement i={2} value={password1} placeholder={'Password 1'} type={'password'} element={password1} changeElement={setPassword1}/>
				<InputElement i={3} value={password2} placeholder={'Password 2'} type={'password'} element={password2} changeElement={setPassword2}/>
			</WindowsSection>
		</>
	)
}

export default Registry;