import React, { useEffect, useState } from 'react';
import { Navigate } from "react-router";
import { authenticationService } from '../services/authentication.service';

const verifyCurrentAuthenticatedUser = (stateSetter, renderSetter) => {
    useEffect(() => {
        authenticationService.verifyAuthentication().then((res) => {
            if (res) stateSetter(true);
            else stateSetter(false);
            renderSetter(true);
        });
    }, [stateSetter, renderSetter])
};

export function PrivateRoute({ component: Component, props }) {
    const [isLogedIn, setIsLogedIn] = useState(false);
    const [render, setRender] = useState(false);

    verifyCurrentAuthenticatedUser(setIsLogedIn, setRender);

    if (render) {
        return (
            isLogedIn ? <Component {...props} /> : <Navigate to="/" />
        );
    } else {
        return <></>
    }
}

export function PublicRoute({ component: Component, props }) {
    const [isLogedIn, setIsLogedIn] = useState(false);
    const [render, setRender] = useState(false);

    verifyCurrentAuthenticatedUser(setIsLogedIn, setRender);

    if (render) {
        return (
            !isLogedIn ? <Component {...props} /> : <Navigate to="/seeker/home" />
        )
    } else {
        return <></>
    };
}
