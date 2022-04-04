import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { connect, useSelector } from 'react-redux'

import axios from 'axios';
import Flash from '../components/flash/Flash.js';



const Register = (props) => {
    const navigate = useNavigate();
    const registerState = useSelector(state => state.register)

    // enable form option for employer or seeker
    const [selectOptions, setSelectOptions] = useState({ securityQuestions: [], seekerPlans: [], employerPlans: [] });

    useEffect(() => {
        //Server request for security questions and plan options
        axios.post(process.env.API_BASEURL + "/form/register").then((res) => {
            setSelectOptions({ ...selectOptions, ...res.data });
        }).catch((err) => {
            props.dispatch({ type: 'MAIN/ALERT_ERROR', payload: err.response.data.error })
        })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(registerState);
        props.registerUser(registerState);
        props.dispatch({ type: 'REGISTER/INIT_FORM' })
    }

    const updateValue = (e) => {
        switch (e.target.name) {
            case 'email':
                props.dispatch({ type: 'REGISTER/SET_EMAIL', payload: e.target.value })
                break;
            case 'password':
                props.dispatch({ type: 'REGISTER/SET_PASSWORD', payload: e.target.value })
                break;
            case 'confirm-password':
                props.dispatch({ type: 'REGISTER/SET_CONFIRMPASSWORD', payload: e.target.value })
                break;
            case 'question-id':
                props.dispatch({ type: 'REGISTER/SET_QUESTIONID', payload: e.target.value })
                break;
            case 'question-answer':
                props.dispatch({ type: 'REGISTER/SET_QUESTIONANSWER', payload: e.target.value })
                break;
            case 'user-type':
                props.dispatch({ type: 'REGISTER/SET_USERTYPE', payload: e.target.value })
                break;
            case 'first-name':
                props.dispatch({ type: 'REGISTER/SET_FIRSTNAME', payload: e.target.value })
                break;
            case 'last-name':
                props.dispatch({ type: 'REGISTER/SET_LASTNAME', payload: e.target.value })
                break;
            case 'company-name':
                props.dispatch({ type: 'REGISTER/SET_COMPANYNAME', payload: e.target.value })
            case 'plan-id':
                props.dispatch({ type: 'REGISTER/SET_PLANID', payload: e.target.value })
                break;
                break;
            default:
        }
    }

    return (
        <div className="card container w-50 mt-4" style={{ background: "rgb(200,200,200)" }}>
            <div className="row">
                <h1 className="display-2 col-6">Register</h1>
                {/* Alerts on login page */}
                {/* {alertState.status &&
                    <div className="col-6 h-25 align-self-center p-2 m-0">
                        <Flash message={alertState.message} type={alertState.type} dispatchAlert={dispatchAlert} />
                    </div>
                } */}
            </div>
            <hr style={{ borderBottom: "4px solid blue" }}></hr>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">EMAIL</label>
                    <input onChange={updateValue} value={registerState.email} type="email" className="form-control" name="email" id="email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">PASSWORD</label>
                    <input onChange={updateValue} value={registerState.password} type="password" className="form-control" name="password" id="password" required />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">CONFIRM PASSOWRD</label>
                    <input onChange={updateValue} value={registerState.confirmPassword} type="password" className="form-control" name="confirm-password" id="confirm-password" required />
                </div>
                <div className="form-group row">
                    <div className="col-6">
                        <label htmlFor="inlineFormCustomSelect">SECURITY QUESTION</label>
                        <select onChange={updateValue} value={registerState.securityQuestionId} className="form-select" name="question-id" required>
                            <option value="" disabled>Choose...</option>
                            {selectOptions.securityQuestions.map((el) => {
                                return <option key={el.id} value={el.id}>{el.question}</option>
                            })}
                        </select>
                    </div>
                    <div className="col-6">
                        <label htmlFor="answer">ANSWER</label>
                        <input onChange={updateValue} value={registerState.securityQuestionAnswer} type="text" className="form-control" name="question-answer" required />
                    </div>
                </div>
                <hr />
                <div className="form-group">
                    <div className="form-group col-4">
                        <label htmlFor="userType ">ACCOUNT TYPE</label>
                        <select onChange={updateValue} value={registerState.userType} className="form-select" name="user-type" required>
                            <option value="" disabled>Choose...</option>
                            <option value="seeker">Job Seeker</option>
                            <option value="employer">Employer</option>
                        </select>
                    </div>
                    <div className="form-group row mt-1" hidden={registerState.userType === "seeker" ? false : true}>
                        <div id="first_name" className="form-group col-4">
                            <label htmlFor="fname">FIRST NAME</label>
                            <input onChange={updateValue} value={registerState.firstName} type="text" className="form-control" name="first-name" required={registerState.userType === "seeker" ? true : false} />
                        </div>
                        <div id="lname" className="form-group col-4">
                            <label htmlFor="lname">LAST NAME</label>
                            <input onChange={updateValue} value={registerState.lastName} type="text" className="form-control" name="last-name" required={registerState.userType === "seeker" ? true : false} />
                        </div>
                        <div id="planSeeker" className="form-group col-4">
                            <label htmlFor="planSeeker">PLAN</label>
                            <select id="inputPlanSeeker" className="form-select" name="plna-id" required={registerState.userType === "seeker" ? true : false}>
                                <option value="" disabled>Choose...</option>
                                {selectOptions.seekerPlans.map((el) => {
                                    return <option key={el.id} value={el.id}>{el.name}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="form-group row mt-1" hidden={registerState.userType === "employer" ? false : true}>
                        <div id="cname" className="form-group col-md-8">
                            <label htmlFor="cname">COMPANY NAME</label>
                            <input onChange={updateValue} value={registerState.companyName} type="text" className="form-control" name="company-name" required={registerState.userType === "employer" ? true : false} />
                        </div>
                        <div id="planEmployer" className="form-group col-md-4">
                            <label htmlFor="planEmployer">PLAN</label>
                            <select id="inputPlanEmployer" className="form-select" name="planEmployer" required={registerState.userType === "employer" ? true : false}>
                                <option value="" disabled>Choose...</option>
                                {selectOptions.employerPlans.map((el) => {
                                    return <option key={el.id} value={el.id}>{el.name}</option>
                                })}
                            </select>
                        </div>
                    </div>
                </div>
                <hr />
                <button className="btn btn-primary mb-2">Submit</button>
            </form>
        </div >
    )
}



export default connect()(Register)