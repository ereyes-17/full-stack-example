import { useEffect, useState } from "react";
import User from "../models/User";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthenticationService from "../services/authentication.service";
import "../styles/register.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const RegisterPage = () => {
    const [user, setUser] = useState(new User("", "", ""));
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    const currentUser = useSelector(state => state.user);

    const navigate = useNavigate();

    //mounted
    useEffect(() => {
        if (currentUser?.id) {
            // go to profile
            navigate("/profile");
        }
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUser((prevState => {
            return {
                ...prevState,
                [name]: value
            }
        }));
    }

    const handleRegister = (e) => {
        e.preventDefault();

        setSubmitted(true);

        if (!user.username || !user.password || !user.name) {
            return;
        }

        setLoading(true);

        AuthenticationService.register(user).then(_ => {
            navigate("/login");
        })
        .catch(error => {
            console.log(error);
            if (error?.response?.status === 409) {
                setErrorMessage("Username or password invalid");
            } else {
                setErrorMessage("Unexpected error occurred: " + error);
            }

            setLoading(false);
        });
    };

    return (
        <div className="container mt-5">
            <div className="card ms-auto me-auto p-3 shadow-lg custom-card">
                <FontAwesomeIcon icon={faUserCircle} className="ms-auto me-auto user-icon" />
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                <form onSubmit={(e) => handleRegister(e)} noValidate className={submitted ? "was-validated" : ""}>

                    <div className="form-group">
                        <label htmlFor="name">Full Name:</label>
                        <input type="text" name="name" className="form-control" placeholder="name" value={user.name} onChange={(e) => handleChange(e)} required/>
                        <div className="invalid-feedback">Full name is required.</div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" name="username" className="form-control" placeholder="username" value={user.username} onChange={(e) => handleChange(e)} required/>
                        <div className="invalid-feedback">Username is required.</div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Username:</label>
                        <input type="password" name="password" className="form-control" placeholder="password" value={user.password} onChange={(e) => handleChange(e)} required/>
                        <div className="invalid-feedback">Invalid password.</div>
                    </div>

                    <button className="btn btn-info w-100 mt-3" disabled={loading}>
                        Sign Up
                    </button>

                </form>

                <Link to="/login" className="btn btn-link" style={{color: "darkgray"}}>
                    I have an account
                </Link>
            </div>
        </div>
    )
};

export {RegisterPage}