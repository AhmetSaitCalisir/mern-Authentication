import { useState } from "react";
import { axios } from "axios";
import { Link } from "react-router-dom";

const RegisterPage = ({ history }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const registerHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "content-type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    }

    try {
      const { data } = await axios.post(
        "/api/auth/register",
        { username, email, password },
        config
      );

      localStorage.setItem("authToken", data.token);
      history.push("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <form onSubmit={registerHandler}>
            {error && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              </div>
            )}
            <div className="form-group">
              <label htmlFor="txt_userName">User Name</label>
              <input
                type="text"
                className="form-control"
                required
                id="txt_userName"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              >
                {" "}
              </input>
            </div>
            <div className="form-group">
              <label htmlFor="txt_email">Email address</label>
              <input
                type="email"
                classNanme="form-control"
                required
                id="txt_email"
                aria-describedby="emailHelp"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              >
                {" "}
              </input>
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="txt_password">Password</label>
              <input
                type="password"
                className="form-control"
                required
                id="txt_password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="txt_confirmPassword">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                required
                id="txt_confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <small id="goLogin" class="form-text text-muted">
              Already have account?{" "}
              <Link to="/login" className="btn btn-link">
                Login
              </Link>
            </small>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
