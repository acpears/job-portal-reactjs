import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { connect, useSelector } from 'react-redux'
import Flash from '../components/flash/Flash.js';

const Login = (props) => {
    const navigate = useNavigate();
    const loginState = useSelector(state => state.login)

    useEffect(() => {

    }, []);

    const handleSubmit = (e) => {
        e.preventDefault(); // prevents the form from submiting

        // Call login function
        props.loginUser(loginState.email, loginState.password);

        // Reset form
        props.dispatch({ type: 'LOGIN/INIT_FORM' })
    }

    const updateFormFields = (e) => {
        switch (e.target.name) {
            case 'userType':
                props.dispatch({ type: 'LOGIN/SET_USERTYPE', payload: e.target.value })
                break
            case 'email':
                props.dispatch({ type: 'LOGIN/SET_EMAIL', payload: e.target.value })
                break;
            case 'password':
                props.dispatch({ type: 'LOGIN/SET_PASSWORD', payload: e.target.value })
                break;
            default:
        }
    }

    return (
        <div className="card container w-50 mt-4" style={{ background: "rgb(200,200,200)" }}>
            <div className="row">
                <h1 className="display-2 col-5">Login</h1>
                {/* Alerts on login page */}
                {/* {alertState.status &&
                    <div className="col-7 h-25 align-self-center p-2 m-0">
                        <Flash message={alertState.message} type={alertState.type} dispatchAlert={dispatchAlert} />
                    </div>
                } */}
            </div>

            <hr style={{ borderBottom: "4px solid blue" }}></hr>
            <form onSubmit={handleSubmit}>
                <div className="form-group w-50">
                    <label htmlFor="userType">ACCOUNT TYPE</label>
                    <select onChange={updateFormFields} value={loginState.userType} id="userType" className="form-select" name="userType">
                        <option value="" disabled>Choose...</option>
                        <option value="seeker">Job Seeker</option>
                        <option value="employer">Employer</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div className="form-group my-2">
                    <label htmlFor="email">EMAIL</label>
                    <input onChange={updateFormFields} value={loginState.email} className="form-control" type="text" name="email" id="email" />
                </div>
                <div className="form-group my-2">
                    <label htmlFor="password">PASSWORD</label>
                    <input onChange={updateFormFields} value={loginState.password} className="form-control" type="password" name="password" id="password" />
                </div>
                <hr />
                <div className="row my-2">
                    <div className="col-xl-2 col-md-3 col-sm-4">
                        <button className="btn btn-primary" type="submit">Submit</button>
                    </div>
                    <div className="col-xl-10 col-md-9 col-sm-8 d-flex align-self-center justify-content-end">
                        <a href="/">Forgot your password?</a>
                    </div>
                </div>
            </form>
        </div >
    )
}

const validateEmail = (email) => {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
}

const validatePasswordFormat = (password) => {
    let re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    return re.test(password);
}

export default connect()(Login)