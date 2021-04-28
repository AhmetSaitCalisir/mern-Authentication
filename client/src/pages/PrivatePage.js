import { useState, useEffect } from "react";
import axios from "axios";

const PrivatePage = ({ history }) => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");

  useEffect(() => {
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get(
          "http://localhost:4545/api/private",
          config
        );
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    fetchPrivateDate();
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    history.push("/login");
  };

  return error ? (
    <div
      className="container
      "
    >
      <div className="row">
        <div className="col">
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div
      className="container
      "
    >
      <div className="row">
        <div className="col">
          <div className="alert alert-success" role="alert">
            {privateData}
          </div>
          <button
            type="button"
            className="btn btn-warning btn-block"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivatePage;
