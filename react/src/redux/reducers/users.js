import produce from "immer"


const initialState = {
    user: {
        email: '',
        password: ''
    }
}
export default produce((state, action) => {
    switch (action.type) {
        case 'SET_NAME':
            state.user.email = action.payload
            break
        case 'SET_PASSWORD':
            state.user.password = action.payload
            break
        default:
            break
    }
}, initialState)