import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {setAuth, setUser} from '../../redux/action'
import AuthServices from "../API/authServices";

const TopBar = () =>{
	const navigate = useNavigate();
	const dispatch = useDispatch ();
	const user = useSelector(state => state.user);
	const isAuth = useSelector(state => state.isAuth);

	const logOut = async (e) => {
		await AuthServices.logout()
		const user = { 
			id:'',
			email:'',
		}
		dispatch (setUser(user));
		dispatch (setAuth(false));
		localStorage.removeItem('token')
		navigate('/');

	}

	// fixed-top
	return (
		<>
			<nav className="navbar navbar-expand-lg rounded bg-white shadow fixed-top font-comfortaa text-dark pt-3 pb-3" >
				  <div className="container-fluid">
						<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample10" aria-controls="navbarsExample10" aria-expanded="false" aria-label="Toggle navigation">
						  <span className="navbar-toggler-icon"></span>
						</button>


						<div className="collapse navbar-collapse justify-content-md-start" id="navbarsExample10">
							<ul className="navbar-nav">
								<li>
									<Link to={'/'} className='nav-link px-4'>Home</Link>
								</li>
								{ isAuth
									?
									<>
										<li>
											<Link to={'/company'} className='nav-link px-4'>Company</Link>
										</li>
										<li>
											<Link to={'add-users'} className='nav-link px-4'>User to Company</Link>
										</li>
									</>
									:
									''
								}
								<li >
									<Link to="/registry" className='nav-link px-4'>New User</Link>
								</li>
							</ul>
						</div>


						<div className="col-5 col-md-3 text-end ">
							<ul className="nav col-md-auto mb-2 justify-content-center mb-md-0">
								{ user.email ?
									<div className='row align-items-center'>
										<div className='col'>
											<span className='navbar-text'>{user.email}</span>
										</div>
										<div className='col-1'>
											<i className="bi bi-box-arrow-in-right navbar-text" style={{'fontSize': '1.8rem', color: 'black'}} onClick={logOut}></i>
										</div>
									</div>
									:
									<li><Link to="/login" className="nav-link px-2">Login</Link></li>
								}
							</ul>
						</div>
				  </div>
			</nav>
		</>
	)
}

export default TopBar