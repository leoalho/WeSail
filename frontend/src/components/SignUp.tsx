/* eslint-disable @typescript-eslint/no-misused-promises */

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { signUp } from "../services/users";

const SignUp = () => {
  const navigate = useNavigate();

  const style = {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    backgroundPosition: "bottom",
    backgroundImage: "url('/images/login.png')",
    backgroundSize: "cover",
  };

  const handleSignUp = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const username = (document.getElementById("username") as HTMLInputElement)
      .value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;
    const password2 = (document.getElementById("password2") as HTMLInputElement)
      .value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    if (password !== password2) {
      toast.error("Passwords don't match");
      return;
    }
    try {
      await signUp({ username, password, email });
      toast.success("Created new user");
      navigate("/");
    } catch {
      toast.error("Failed to create new user");
    }
  };
  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <div style={style}>
      <form onSubmit={handleSignUp} className="form">
        <center>
          <h2>SIGNUP</h2>
        </center>
        <center>
          <div>
            <input
              type="text"
              name="Username"
              id="username"
              placeholder="username"
              style={{ fontSize: "15px", width: "90%" }}
            />
          </div>
          <div>
            <input
              type="text"
              name="Email"
              id="email"
              placeholder="email"
              style={{ fontSize: "15px", width: "90%", marginTop: "10px" }}
            />
          </div>
          <div>
            {" "}
            <input
              type="password"
              name="Password"
              id="password"
              placeholder="password"
              style={{ fontSize: "15px", width: "90%", marginTop: "10px" }}
            />
          </div>
          <div>
            {" "}
            <input
              type="password"
              name="Password2"
              id="password2"
              placeholder="password again"
              style={{ fontSize: "15px", width: "90%", marginTop: "10px" }}
            />
          </div>
          <button
            type="submit"
            style={{ fontSize: "20px", width: "100%", marginTop: "15px" }}
          >
            Create user
          </button>
        </center>
      </form>
    </div>
  );
};

export default SignUp;
