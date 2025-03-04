import React, { useState } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

const EmployeeForm = () => {
    const [name, setName] = useState("");
    const [salary, setSalary] = useState(0);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [designation, setDesignation] = useState("");
    const [department, setDepartment] = useState("");
    const [gender, setGender] = useState("");
    const [message, setMessage] = useState("");
    const [isShow, setIsShow] = useState(false);

    async function handleSubmit() {
        try {
            let axios_response = await axios.post("https://67b418f7392f4aa94fa94a41.mockapi.io/Employe_data", {
                employee_name: name,
                employee_salary: salary,
                employee_email: email,
                employee_password: password,
                employee_designation: designation,
                employee_department: department,
                employee_gender: gender,
                role: "Admin"
            }).catch((E) => { console.log(E) });
            console.log(axios_response);
            setMessage("Your Data Save successFully");
            setIsShow(true);
            clear();
        } catch (error) {
            console.log(error);
        }
    }

    function clear() {
        setName("");
        setSalary(0);
        setEmail("");
        setPassword("");
        setDesignation("");
        setDepartment("");
        setGender("");
    }

    return (
        <div className="login-container">

            <div className="login-card mt-5 mb-5">
                <h2 className="text-center fw-bold text-warning">Employee Information</h2>

                <div>

                    <div className="mb-2">
                        <label className="form-label fw-bold">- Enter Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Employee Name"
                        />
                    </div>

                    <div className="mb-2">
                        <label className="form-label fw-bold">- Enter Salary</label>
                        <input
                            type="number"
                            className="form-control"
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                            placeholder="Employee Salary"
                        />
                    </div>

                    <div className="mb-2">
                        <label className="form-label fw-bold">- Enter Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Employee Email"
                        />
                    </div>

                    <div className="mb-2">
                        <label className="form-label fw-bold">- Enter Password</label>
                        <input
                            type="text"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Employee Password"
                        />
                    </div>

                    <div className="mb-2">
                        <label className="form-label fw-bold">- Enter Designation</label>
                        <input
                            type="text"
                            className="form-control"
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                            placeholder="Employee Designation"
                        />
                    </div>

                    <div className="mb-2">
                        <label className="form-label fw-bold">- Enter Department</label>
                        <input
                            type="text"
                            className="form-control"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            placeholder="Employee Department"
                        />
                    </div>

                    <div className="">
                        <label className="form-label fw-bold">- Select Gender:</label> &nbsp; &nbsp;
                        <input
                            type="radio"
                            name="gender"
                            value="male"
                            onChange={(e) => setGender(e.target.value)}
                            checked={gender === "male"}
                        /> &nbsp; Male &nbsp;
                        <input
                            type="radio"
                            name="gender"
                            value="female"
                            onChange={(e) => setGender(e.target.value)}
                            checked={gender === "female"}
                        /> &nbsp; Female &nbsp;
                        <input
                            type="radio"
                            name="gender"
                            value="other"
                            onChange={(e) => setGender(e.target.value)}
                            checked={gender === "other"}
                        /> &nbsp; Other &nbsp;
                    </div>

                    <button className="btn btn-primary w-100 fw-bold mt-2" onClick={handleSubmit}>
                        SUBMIT
                    </button>

                    {
                        isShow && (
                            <h5 className="text-center mt-3 text-warning">{message}</h5>
                        )
                    }

                </div>
            </div>
        </div>
    );
};

export default EmployeeForm;