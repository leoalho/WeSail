/* eslint-disable @typescript-eslint/no-misused-promises */

import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../services/password";

const NewPassword = () => {
  const { id } = useParams();
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const navigate = useNavigate();

  const handleReset = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (password !== password2) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      if (id) {
        await resetPassword(id, { password: password });
        toast.success("Password changed");
        navigate("/");
      }
    } catch (exception) {
      toast.error("Wrong credentials");
    }
  };

  const style = {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    backgroundPosition: "bottom",
    backgroundImage: "url('/images/login.png')",
    backgroundSize: "cover",
  };

  return (
    <div style={style}>
      <form onSubmit={handleReset} className="form">
        <center>
          <h2>Reset Password</h2>
        </center>
        <center>
          <div>
            {" "}
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
              placeholder="password"
              style={{ fontSize: "15px", width: "90%", marginTop: "10px" }}
            />
          </div>
          <div>
            {" "}
            <input
              type="password"
              value={password2}
              name="Password2"
              onChange={({ target }) => setPassword2(target.value)}
              placeholder="password again"
              style={{ fontSize: "15px", width: "90%", marginTop: "10px" }}
            />
          </div>
          <button
            type="submit"
            style={{ fontSize: "20px", width: "100%", marginTop: "15px" }}
          >
            Renew password
          </button>
          <br />
        </center>
      </form>
    </div>
  );
};

export default NewPassword;
