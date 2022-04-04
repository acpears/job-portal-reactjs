import { useEffect, useState } from 'react';
import { authenticationService } from '@/services';
import { Navigate } from 'react-router-dom'

export default function SeekerHome(props) {

    return (
        <>
            <div className="container">

                <div className="jumbotron">
                    <h1 className="display-3">Welcome {props.authorizedUser.name} </h1>
                    <p className="lead">Email: {props.authorizedUser.email}</p>
                    <p className="lead">Acount Type: {props.authorizedUser.userType}</p>
                    <hr className="my-2" />
                </div>
            </div>
        </>

    )

}
