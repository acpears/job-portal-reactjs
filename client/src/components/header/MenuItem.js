import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap';


export default function MenuItem({ name, url }) {
    const navigate = useNavigate();

    const style = {
        whiteSpace: "nowrap"
    }

    const handleClick = (e) => {
        navigate(url);
    }
    return <Button onClick={handleClick} variant="secondary" size="sm" className="mx-1" style={style}>{name}</Button>

}
