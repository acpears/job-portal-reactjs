export const loginReducer = (state = {
    userType: "",
    email: "",
    password: "",
}, { type, payload }) => {

    switch (type) {
        case "LOGIN/SET_USERTYPE":
            return { ...state, userType: payload }
        case "LOGIN/SET_PASSWORD":
            return { ...state, password: payload }
        case "LOGIN/SET_EMAIL":
            return { ...state, email: payload }
        case "LOGIN/INIT_FORM":
            return {
                userType: "",
                email: "",
                password: "",
            }
        default:
            return state
    }
}

export const registerReducer = (state = {
    email: "",
    password: "",
    confirmPassword: "",
    securityQuestionId: "",
    securityQuestionAnswer: "",
    userType: "",
    firstName: "",
    lastName: "",
    companyName: ""
}, { type, payload }) => {
    switch (type) {
        case "REGISTER/SET_EMAIL":
            return { ...state, email: payload }
        case "REGISTER/SET_PASSWORD":
            return { ...state, password: payload }
        case "REGISTER/SET_CONFIRMPASSWORD":
            return { ...state, confirmPassword: payload }
        case "REGISTER/SET_QUESTIONID":
            return { ...state, securityQuestionId: payload }
        case "REGISTER/SET_QUESTIONANSWER":
            return { ...state, securityQuestionAnswer: payload }
        case "REGISTER/SET_USERTYPE":
            if (payload === 'seeker') {
                return { ...state, companyName: "", userType: payload }
            } else if (payload === 'employer') {
                return { ...state, firstName: "", lastName: "", userType: payload }
            }
        case "REGISTER/SET_FIRSTNAME":
            return { ...state, firstName: payload }
        case "REGISTER/SET_LASTNAME":
            return { ...state, lastName: payload }
        case "REGISTER/SET_COMPANYNAME":
            return { ...state, companyName: payload }
        case "REGISTER/INIT_USERTYPESEEKER":
            return { ...state, firstName: "", lastName: "" }
        case "REGISTER/INIT_USERTYPEEMPLOYER":
            return { ...state, companyName: "" }
        case "REGISTER/INIT_FORM":
            return {
                email: "",
                password: "",
                confirmPassword: "",
                securityQuestionId: "",
                securityQuestionAnswer: "",
                userType: "",
                firstName: "",
                lastName: "",
                companyName: ""
            }
        default:
            return state
    }
}

export const headerReducer = (state = {
    loadHeader: false,
    loginDisabled: false,
    loginHidden: false,
    logoutDisabled: true,
    logoutHidden: true,
    registerDisabled: false,
    registerHidden: false,

}, { type, payload }) => {
    switch (type) {
        case "LOGIN_PAGE":
            return { ...state, loginDisabled: true, loginHidden: false, registerDisabled: false, registerHidden: false, logoutHidden: true, loadHeader: true }
        case "REGISTER_PAGE":
            return { ...state, loginDisabled: false, loginHidden: false, registerDisabled: true, registerHidden: false, logoutHidden: true, loadHeader: true }
        case "HOME_PAGE":
            return { ...state, loginDisabled: false, loginHidden: false, registerDisabled: false, registerHidden: false, logoutHidden: true, loadHeader: true }
        case "LOGED_IN":
            return { ...state, loginHidden: true, registerHidden: true, logoutDisabled: false, logoutHidden: false, loadHeader: true }
        default:
            return state
    }
};

export const mainAlertReducer = (state = {
    status: false,
    type: '',
    message: ''
}, { type, payload }) => {
    switch (type) {
        case "MAIN/ALERT_ERROR":
            return { ...state, status: true, type: 'error', message: payload }
        case "MAIN/ALERT_SUCCESS":
            return { ...state, status: true, type: 'success', message: payload }
        case "INIT_ALERT":
            return { ...state, status: false, message: "" }
        default:
            return state
    }
}
