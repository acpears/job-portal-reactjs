import { useEffect, useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { connect, useSelector } from 'react-redux'
import { ErrorBoundary } from 'react-error-boundary'
import { authenticationService } from './services/authentication.service'

// Component imports
import { PrivateRoute, PublicRoute } from './routes/Auth.Routes.js';
import Flash from './components/flash/Flash.js';
import Header from './components/header/Header.js'
import Home from './views/Home.js';
import Login from './views/Login.js';
import Register from './views/Register.js'
import SeekerHome from './views/Home.Seeker.js'
import SeekerJobs from './views/Jobs.Seeker.js';

function ErrorFallback({ error, resetErrorBoundary }) {
    return (<>
        <h1>ERROR</h1>
    </>
    )
}

const App = (props) => {

    const navigate = useNavigate();
    const appAlertState = useSelector(state => state.mainAlert)

    // authorized user state to use within app
    const [authorizedUser, setAuthorizedUser] = useState(null);
    // State to renter page when authorized user has been checked
    const [loadSite, setLoadSite] = useState(false);

    useEffect(() => {

        // Subcription to set authorized user when loged in our loged out
        const authenticatedSubscription = authenticationService.authenticatedUser.subscribe((user) => {
            if (user) { console.log('Current user: ' + user.email) }
            else { console.log('Current user: \nnone') }
            console.log("Called");
            setAuthorizedUser(user);
        });

        // When app loads verify the current authorized user (token validation)
        authenticationService.verifyAuthentication().then((authorized) => {
            console.log('Authorized: ' + authorized);
            setLoadSite(true);
        });

        return () => {
            authenticatedSubscription.unsubscribe()
        };
    }, [])

    const registerUser = (user) => {
        authenticationService.register(user).then((user) => {
            navigate('/');
            props.dispatch({ type: 'MAIN/ALERT_SUCCESS', payload: user.email + " registered" })
        }).catch((err) => {
            props.dispatch({ type: 'MAIN/ALERT_ERROR', payload: err })
        })
    }

    const loginUser = (email, password) => {
        authenticationService.login("seeker", "adamcpearson@yahoo.ca", "123").then((user) => {
            navigate('/seeker/home')
            props.dispatch({ type: 'MAIN/ALERT_SUCCESS', payload: user.email + " has logged in" })
        }).catch((err) => {

            props.dispatch({ type: 'MAIN/ALERT_ERROR', payload: err })
        })
    }

    const logoutUser = () => {
        const oldUser = authorizedUser;
        authenticationService.logout();
        navigate('/')
        props.dispatch({ type: 'MAIN/ALERT_SUCCESS', payload: oldUser.email + " has been logged out" })
    }

    const componentProps = {
        authorizedUser,
        registerUser,
        loginUser,
        logoutUser
    }

    return (loadSite && <>
        <Header {...componentProps} />
        <div className='container-fluid' style={{ minHeight: "75px" }}>
            {appAlertState.status &&
                <div className="align-self-center p-2 m-0">
                    <Flash message={appAlertState.message} type={appAlertState.type} />
                </div>
            }
        </div>
        <Routes>
            <Route path="" element={<PublicRoute props={componentProps} component={Home} />} />
            <Route exact path="login" element={<PublicRoute props={componentProps} component={Login} />} />
            <Route exact path="register" element={<PublicRoute props={componentProps} component={Register} />} />
            <Route exact path="seeker/home" element={<PrivateRoute props={componentProps} component={SeekerHome} />} />
            <Route exact path="seeker/jobs" element={<PrivateRoute props={componentProps} component={SeekerJobs} />} />

            {/* <Route path="/home" element={<PrivateRoute props={componentProps} component={Private} />} /> */}


        </Routes>
    </>)
}
export default connect()(App)