import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { connect, useSelector } from 'react-redux'
import { authenticationService } from '@/services';
import MenuItem from './MenuItem';
import * as items from './menuitems.js'



const Header = (props) => {
    const headerState = useSelector(state => state.header)
    const location = useLocation();
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        if (!props.authorizedUser) {
            switch (location.pathname) {
                case '/login':
                    props.dispatch({ type: 'LOGIN_PAGE' })
                    break;
                case '/register':
                    props.dispatch({ type: 'REGISTER_PAGE' })
                    break;
                case '/':
                    props.dispatch({ type: 'HOME_PAGE' })
                    break;
                default:
                    break;
            }
        }

        else {
            props.dispatch({ type: 'LOGED_IN' })
        }

        // Set menu items depending on the type of user
        if (!props.authorizedUser) setMenuItems([]);
        else if (props.authorizedUser.userType === "admin") setMenuItems(items.adminMenuItems);
        else if (props.authorizedUser.userType === "seeker") setMenuItems(items.seekerMenuItems);
        else if (props.authorizedUser.userType === "employer") setMenuItems(items.employerMenuItems);

    }, [location, props.authorizedUser])

    return (headerState.loadHeader &&
        <div className="header d-flex align-items-center">
            <Link to="/" className="m-0 mx-3 d-inline-block" style={{ minWidth: "8em", textDecoration: "none", color: "black" }}><h4>Job Portal</h4></Link>
            {menuItems.map((el) => {
                return <MenuItem key={el.title} name={el.title} url={el.url} />
            })}
            <div className="h-100 w-100 d-flex align-items-center justify-content-end">
                <div className="m-2 d-flex align-items-center">
                    {/* {login && <button type="button" className="btn btn-primary btn-header mx-2">Sign Up</button>}
                    {signup && <button type="button" className="btn btn-primary btn-header me-2">Login</button>} */}
                    {!headerState.loginHidden && <Link to="/login" className={"btn btn-primary btn-header mx-2 " + (headerState.loginDisabled ? "disabled" : "")}>Login</Link>}
                    {!headerState.logoutHidden && <button onClick={props.logoutUser} className={"btn btn-primary btn-header mx-2 " + (headerState.logoutDisabled ? "disabled" : "")}>Logout</button>}
                    {!headerState.registerHidden && <Link to="/register" className={"btn btn-primary btn-header mx-2 " + (headerState.registerDisabled ? "disabled" : "")}>Register</Link>}
                </div>
            </div>
        </div>

    )
}


export default connect()(Header)