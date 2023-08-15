import {useDispatch} from "react-redux";
import {setLoader} from "../../redux/action";
import {useState} from "react";

export const useFetching = (callBack) => {
    const dispatch = useDispatch();
    const [messageError, setMessageError] = useState('');
    const result = async (...args) => {

        try {
            dispatch(setLoader(true));
            await callBack (...args);
        } catch (e) {
            console.log('Hook error report:', e)
            // console.log('Hook error report detail:', e.response.data.message)
            setMessageError(e.message + '. (DETAIL: ' + e.response.data.msg + ')' );
            // setMessageError(e.message  );
        } finally {
            dispatch(setLoader(false));
        }
    }

    const clearMessageError = () => setMessageError('')

    return [result, messageError, clearMessageError];
}

