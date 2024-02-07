import {useState, useContext} from "react";
import {UsersContext} from "../../Context/UsersContextProvider";
import Button from "../../Components/Button/Button";

const Login = ({onBackgroundClick}) => {
  const {authenticateUser, createUser} = useContext(UsersContext);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [newUser, setNewUser] = useState(false);

  const handleLogin = async () => {
    const success = await authenticateUser(name, age);
    if (success) {
      window.alert("Successfully logged in");
      onBackgroundClick();
    }
  };

  const handleNewUser = async () => {
    const success = await createUser(name, age);
    if (success) {
      window.alert("User created");
      setNewUser(false);
      handleLogin();
    }
  };

  const handlePropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div onClick={onBackgroundClick}>
      <div onClick={handlePropagation}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </label>
        {!newUser ? (
          <Button onClick={handleLogin}>Login</Button>
        ) : (
          <Button onClick={handleNewUser}>Create Account</Button>
        )}
        <div>
          {!newUser ? (
            <div>
              <p>Dont have an account yet?</p>{" "}
              <Button onClick={() => setNewUser(true)}>
                Create a new account
              </Button>
            </div>
          ) : (
            <div>
              <p>Already have an account?</p>
              <Button onClick={() => setNewUser(false)}>Log In</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
