import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "react-tooltip/dist/react-tooltip.css";

const Signup = () => {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userGender, setUserGender] = useState("");

    const [message, setMessage] = useState("");
    const [isShow, setIsShow] = useState(false);
    const navigate = useNavigate();

    async function signupLogic(e) {
        e.preventDefault();
        try {
            let axios_response = await axios.get(
                "https://67b416df392f4aa94fa93d91.mockapi.io/user",
                {
                    name: userName,
                    email: userEmail,
                    password: userPassword,
                    gender: userGender,
                }
            );
            console.log(axios_response);
            alert("User Created SuccessFully");
        } catch (error) {
            console.log(error);
        }
    }

    async function signupLogic() {
        try {
            let axios_response = await axios.post("https://67b416df392f4aa94fa93d91.mockapi.io/user", {
                name: userName,
                email: userEmail,
                password: userPassword,
                gender: userGender,
            }).catch((e) => { console.log(e) });
            console.log(axios_response);
            setMessage("Your Data Save successFully");
            setIsShow(true);
            clear();
        } catch (error) {
            console.log(error);
        }
    }

    function clear() {
        setUserName("");
        setUserEmail(0);
        setUserPassword("");
        setUserGender("");
    }

    useEffect(() => {
        if (isShow === true) {
            let timer = setTimeout(() => {
                setIsShow(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    })


    return (
        <div className="login-container">

            <div className="login-card">
                <h2 className="text-center fw-bold my-4 text-warning">Register Your Account</h2>

                <div>
                    <div className="mb-3">
                        <label className="form-label">Enter Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="Enter your Username"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Enter Email</label>
                        <input
                            type="text"
                            className="form-control"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            placeholder="Enter your Email"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Enter Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)}
                            placeholder="Enter your Password"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Select Gender</label>
                        <select className='form-select' onChange={(e) => setUserGender(e.target.value)}>
                            <option value=''>Select</option>
                            <option value='Male'>Male</option>
                            <option value='Female'>Female</option>
                            <option value='Other'>Other</option>
                        </select>
                    </div>

                    {
                        isShow && (
                            <h5 className="text-center mt-3 text-warning">{message}</h5>
                        )
                    }
                    <button className="btn btn-primary w-100 fw-bold mt-3 mb-3" onClick={signupLogic}>
                        Signup
                    </button>
                    <Link className="text-center pt-3" onClick={() => (navigate("/"))}>You have an account? Please Login</Link>

                </div>
            </div>
        </div>
    );
};

export default Signup;