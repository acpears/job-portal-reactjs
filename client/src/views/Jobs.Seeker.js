import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

import { connect, useSelector } from 'react-redux'
import axios from 'axios';

function SeekerJobs(props) {

    const [postings, setPostings] = useState([]);

    const getPostings = () => {
        //Server request for postings
        const requestOptions = {
            baseURL: process.env.API_BASEURL,
            url: 'job/postings',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({})
        };
        axios.request(requestOptions).then((res) => {
            setPostings(res.data);

        }).catch((err) => {
            props.dispatch({ type: 'MAIN/ALERT_ERROR', payload: err.response.data.error })
        })
    }

    useEffect(() => {
        getPostings();
    }, [])

    return (
        <div className="container">
            <Table>
                <thead>
                    <tr>
                        <th >Company Name</th>
                        <th >Job Title</th>
                        <th >Job Category</th>
                        <th >Description</th>
                        <th >Date Posted</th>
                        <th >Positions Available</th>
                        <th >Apply</th>
                    </tr>
                    {postings.map((el) => {
                        return (
                            <tr>
                                <td >Company Name</td>
                                <td >{el.title}</td>
                                <td >Job Category</td>
                                <td >{el.description}</td>
                                <td >Date Posted</td>
                                <td >Positions Available</td>
                                <td >Apply</td>
                            </tr>
                        )
                    })}
                </thead>
                <tbody>

                </tbody>
            </Table>
        </div >
    )
}

export default connect()(SeekerJobs)