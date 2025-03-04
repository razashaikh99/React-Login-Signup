import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [show, setShow] = useState(false);

    const navigate = useNavigate();
    let mockapiUrl = "https://67b416df392f4aa94fa93d91.mockapi.io/user";

    async function loginLogic() {
        let apiData = axios.get(mockapiUrl)
        let getDataApi = (await apiData).data
        let findRecord = getDataApi.find((a) => (a.name === email || a.email === email) && a.password === password)

        if (findRecord) {
            let userName = findRecord.name;
            let role = findRecord.role;
            navigate("/data", { state: { n: userName, rol: role } })

        } else {
            setMessage("Invalid Credentials");
            setShow(false);
        }
    }

    useEffect(() => {
        if (show === true) {
            let timer = setTimeout(() => {
                setShow(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    })

    return (
        <div className="login-container">

            <div className="login-card">
                <h2 className="text-center fw-bold my-4">🔐 Login</h2>

                <div>
                    <div className="mb-3">
                        <label className="form-label">User Email or User Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your Email & Username"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                    </div>

                    {
                        show && (
                            <h4 style={{ color: "red" }}>{message}</h4>
                        )
                    }

                    <button className="btn btn-primary w-100 fw-bold mt-3 mb-3" onClick={loginLogic}>
                        Login
                    </button>
                    <Link className="text-center pt-3" to="/signup">Don't have an account? Please SignUp</Link>

                </div>
            </div>
        </div>
    );
};

export default Login;