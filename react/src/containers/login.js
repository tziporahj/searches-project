import { connect } from "react-redux"
import { setUserEmail, setUserPassword } from '../redux/actions/users'
import axios from 'axios'
import { useState } from "react"
import { auth } from "../firebase"

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setEmail: (name) => { dispatch(setUserEmail(name)) },
        setpassword: (password) => { dispatch(setUserPassword(password)) },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(function Users(props) {
    const { user, setEmail, setpassword } = props;

    async function newUser(e) {

        e.preventDefault();
        debugger

        auth.createUserWithEmailAndPassword(user.email, user.password)
            .then((userCredential) => {
                debugger
                const refreshToken = userCredential.user.refreshToken

                return axios.post('http://localhost:3000/users/saveUser', {
                    email: user.email,
                    password: user.password
                })
                    .then(function (response) {
                        debugger
                        const serverToken = response.data.serverToken
                        localStorage.setItem('serverToken', serverToken)
                        if (response.status == 200) {
                            props.history.push('/search')
                        }
                    })
            })
            .catch((error) => {
                debugger
                alert(error.message)
            });

    }

    async function login(e) {

        e.preventDefault();
        auth.signInWithEmailAndPassword(user.email, user.password)
            .then((userCredential) => {
                debugger
                const refreshToken = userCredential.user.refreshToken

                return axios.post('http://localhost:3000/users/login', {
                    email: user.email,
                    password: user.password
                }).then(function (response) {
                    debugger
                    const serverToken = response.data.serverToken
                    localStorage.setItem('serverToken', serverToken)

                    if (response.status == 200) {
                        props.history.push('/search')
                    }
                })
            }).catch((error) => {
                alert(error.message)
            });
    }




    return (
        <>
            <form >
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email</label>
                    <input className="form-control" value={user.name} onChange={(e) => { setEmail(e.target.value) }} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control mb-3" value={user.password} onChange={(e) => { setpassword(e.target.value) }} id="exampleInputPassword1" placeholder="Password" />
                </div>

                <button onClick={newUser} className="btn btn-primary">משתמש חדש</button>
                <div style={{ width: "5px", height: "auto", display: "inline-block" }}></div>
                <button onClick={login} className="btn btn-primary ">התחברות</button>

            </form>
        </>
    )
})
