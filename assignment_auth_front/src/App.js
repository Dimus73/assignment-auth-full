import './App.css';


import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'


import {Layout} from "./Components/Layout/Layout";
import {PageNoFound} from "./Components/PageNoFound";
import HomePage from "./Components/Homepage";
import Registry from "./Components/Auth/Registry";
import Login from "./Components/Auth/Login";
import Company from "./Components/Company/Company";
import {useEffect} from "react";
import AuthServices from "./Components/API/authServices";
import {setAuth, setLoader, setUser} from "./redux/action";
import AddUsers from "./Components/AddUsers/AddUsers";

function App() {
    const dispatch = useDispatch();
    useEffect(()=>{
        const t = async () =>{
            // This condition blocks the double call. The double call is due to the nature
            // of the development mode in React. A double call must be prevented because
            // of the asyn, the user authentication logic is violated by refresh token

            if (!sessionStorage.getItem('fs')){
                sessionStorage.setItem( 'fs', "true" )
                try {
                    const response = await AuthServices.checkAuth();
                    dispatch(setAuth(true));
                    dispatch(setUser(
                        {
                            id : response.data.id,
                            email : response.data.email,
                        })
                    )
                    localStorage.setItem( 'token', response.data.access_token )
                    sessionStorage.removeItem('fs')
                    dispatch(setLoader(false))
                } catch (e) {
                    dispatch(setLoader(false))
                    sessionStorage.removeItem('fs')
                    // alert('Global error with the database')
                    console.log(e)
                }
            }
        }
        t();
    },[])
  return (
      <>
        {/* <Ingredients /> */}
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index             element={<HomePage />} />
            <Route path='login'      element={<Login />} />
            <Route path='registry'   element={<Registry />} />

            <Route path='company'    element={<Company />} />
            <Route path='add-users'  element={<AddUsers />} />

            <Route path='*'          element={<PageNoFound />} />
          </Route>
        </Routes>
      </>
  );
}

export default App;
