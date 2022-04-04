import React, { useEffect } from 'react'
import { connect } from 'react-redux'

const Flash = (props) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            props.dispatch({ type: 'INIT_ALERT' })
        }, 2000);
        return () => {
            clearTimeout(timer.current);
        };
    });

    if (props.type === 'error') {
        return (
            <div className="alert alert-danger align-content-center m-0" role="alert">
                <strong>{props.message}</strong>
            </div>
        )
    }
    if (props.type === 'success') {
        return (
            <div className="alert alert-success align-content-center m-0" role="alert">
                <strong>{props.message}</strong>
            </div>
        )
    }
}

export default connect()(Flash)
