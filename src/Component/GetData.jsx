import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

export default function GetData() {
    let [record, setRecord] = useState([]);
    let [search, setSearch] = useState("");
    let [sort, setSort] = useState("");
    let [message, setMessage] = useState("");
    let [isShow, setIsShow] = useState(false);

    let mockapi_url = "https://67b418f7392f4aa94fa94a41.mockapi.io/Employe_data";

    let [name, setName] = useState("")
    let [salary, setSalary] = useState("")
    let [email, setEmail] = useState("")
    let [designation, setDesignation] = useState("")
    let [department, setDepartment] = useState("")
    let [id, setId] = useState(null)

    function fetchRecord(a, b, c, d, e, f) {
        setName(a)
        setSalary(b)
        setEmail(c)
        setDesignation(d)
        setDepartment(e)
        setId(f)
    }

    useEffect(() => {
        axios
            .get(`${mockapi_url}`)
            .then((getData) => {
                setRecord(getData.data);
            })
            .catch((e) => console.error(e));
    }, []);

    // Delete Logic
    function DeleteRecord(id, employee_name) {
        if (window.confirm(`Are you sure you want to delete ${employee_name} Record`)) {
            axios.delete(`${mockapi_url}/${id}`)
                .then(() => {
                    setRecord((a) => a.filter((userRecord) => userRecord.id !== id));
                    setMessage("Record Deleted Successfully");
                    setIsShow(true);
                })
        }
    }

    // Update Logic
    function UpdateLogic() {
        axios.put(`${mockapi_url}/${id}`,
            {
                employee_name: name,
                employee_salary: salary,
                employee_email: email,
                employee_designation: designation,
                employee_department: department,
            }
        )
            .then(() => {
                setRecord((i) => i.map((a) => a.id === id ? {
                    ...a,
                    employee_name: name,
                    employee_salary: salary,
                    employee_email: email,
                    employee_designation: designation,
                    employee_department: department,
                } : a))
                // setMessage("Record Updated Successfully")
                toast.info("Record Updated Successfully")
                setIsShow(true)
            }).catch((e) => { console.error(e) })
    }

    // Timer For Message
    useEffect(() => {
        if (isShow === true) {
            var timer = setTimeout(() => {
                setIsShow(false)
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [isShow])


    // Employee Searching Logic
    var searchEmployees = search
        ? record.filter((a) => a.employee_name.toLowerCase().includes(search.toLowerCase()))
        : record;

    if (sort === "asc") {
        searchEmployees = searchEmployees.sort((a, b) => a.employee_salary - b.employee_salary);
    } else if (sort === "desc") {
        searchEmployees = searchEmployees.sort((a, b) => b.employee_salary - a.employee_salary);
    }
    else if (sort === "az") {
        searchEmployees = searchEmployees.sort((a, b) => a.employee_name.localeCompare(b.employee_name));
    } else if (sort === "za") {
        searchEmployees = searchEmployees.sort((a, b) => b.employee_name.localeCompare(a.employee_name));
    }

    return (
        <div className='container mt-4'>
            <h1 className='text-center mb-4 fw-bold'>Employees Data</h1>

            <div className='row mb-4'>
                <div className='d-flex justify-content-between mb-3 col-md-2'>
                    <Link className='btn btn-warning w-100' to='/em'>Add Employee +</Link>
                </div>

                <div className='col-md-6'>
                    <input
                        type='text'
                        placeholder='Search Employee by Name'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className='form-control'
                    />
                </div>
                <div className='col-md-4'>
                    <select className='form-select' onChange={(e) => setSort(e.target.value)}>
                        <option value=''>Sort by</option>
                        <option value='asc'>Salary Ascending Order</option>
                        <option value='desc'>Salary Descending Order</option>
                        <option value='az'>Name A to Z</option>
                        <option value='za'>Name Z to A</option>
                    </select>
                </div>
            </div>

            {
                isShow && (
                    <h5 className="text-center mt-3 mb-3 text-danger fw-bold fs-4">{message}</h5>
                )
            }
            
            {
                searchEmployees.length === 0 &&
                (
                    <p style={{ color: "red", textAlign: "center", fontSize: "26px", fontWeight: "bold" }}> No Searched Record Found</p>
                )
            }
            {/* </div> */}

            {/* <!-- Modal --> */}
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title fw-bold" id="exampleModalLabel">Edit Employee Details</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <input
                                type="text"
                                placeholder='Edit Name'
                                className='form-control my-3'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder='Edit Salary'
                                className='form-control my-3'
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}
                            />
                            <input
                                type="email"
                                placeholder='Edit Email'
                                className='form-control my-3'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder='Edit Designation'
                                className='form-control my-3'
                                value={designation}
                                onChange={(e) => setDesignation(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder='Edit Department'
                                className='form-control my-3'
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                            />
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary close_btn" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onClick={() => {
                                UpdateLogic()
                                document.querySelector(".close_btn").click()
                            }}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row'>
                {record.length === 0 ? (
                    <p style={{ color: "red", textAlign: "center", fontSize: "26px", fontWeight: "bold" }}>No Employee Record Found</p>
                ) :
                    (
                        searchEmployees.map((a) => (
                            <div className="col-md-4">
                                <div className='card shadow-lg border-0 mb-4'>
                                    <img
                                        src="https://static.vecteezy.com/system/resources/previews/051/558/695/non_2x/id-card-identity-badge-driver-license-business-security-concept-3d-icon-cartoon-minimal-style-vector.jpg"
                                        className='card-img-top img-fluid rounded-top'
                                        style={{ height: '230px', objectFit: 'cover' }}
                                    />
                                    <div class="card-body">
                                        <h4 className='card py-1 card-title fw-bold text-center'>{a.employee_name}</h4>
                                        <p className='card-text'><b>- Email:</b> {a.employee_email}</p>
                                        <p className='card-text'><b>- Salary:</b> {a.employee_salary}</p>
                                        <p className='card-text'><b>- Department:</b> {a.employee_department}</p>
                                        <p className='card-text'><b>- Designation:</b> {a.employee_designation}</p>
                                        <div className='d-flex justify-content-center gap-3'>
                                            <button className='btn btn-danger w-50'
                                                onClick={() => DeleteRecord(a.id, a.employee_name)}>
                                                <i class="bi bi-trash-fill"></i> Remove
                                            </button>
                                            <button className='btn btn-warning w-50'
                                                data-bs-toggle="modal" data-bs-target="#exampleModal"
                                                onClick={() => { fetchRecord(a.employee_name, a.employee_salary, a.employee_email, a.employee_designation, a.employee_department, a.id) }}>
                                                <i class="bi bi-pencil-fill"></i> Update
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )
                }
            </div>
            <ToastContainer />
        </div>
    );
}