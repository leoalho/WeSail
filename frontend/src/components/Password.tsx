/* eslint-disable @typescript-eslint/no-misused-promises */

import { useState } from "react";
import toast from "react-hot-toast";
import { sendResetEmail } from "../services/password";

const Password = () => {
  const [username, setUsername] = useState<string>("");

  const handleReset = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      await sendResetEmail({ username: username });
      setUsername("");
      toast.success(`Password link sent`);
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
          <h2>Reset password</h2>
        </center>
        <center>
          <div>
            <input
              type="text"
              value={username}
              name="Username "
              onChange={({ target }) => setUsername(target.value)}
              placeholder="username"
              style={{ fontSize: "15px", width: "90%" }}
            />
          </div>
          <button
            type="submit"
            style={{ fontSize: "20px", width: "100%", marginTop: "15px" }}
          >
            Send email
          </button>
          <br />
        </center>
      </form>
    </div>
  );
};

export default Password;
