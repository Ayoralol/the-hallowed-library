import {useState, useContext} from "react";
import {UsersContext} from "../../Context/UsersContextProvider";
import Button from "../../Components/Button/Button";
import styles from "./Login.module.scss";

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
    <div onClick={onBackgroundClick} className={styles.back}>
      <div onClick={handlePropagation} className={styles.container}>
        <label className={styles.container__input}>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className={styles.container__input}>
          Age:
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </label>
        {!newUser ? (
          <Button onClick={handleLogin} size={"mid"}>
            Login
          </Button>
        ) : (
          <Button onClick={handleNewUser} size={"mid"}>
            Create New Account
          </Button>
        )}
        <div className={styles.container__switch}>
          {!newUser ? (
            <div className={styles.container__switch_contents}>
              <p>Dont have an account yet?</p>{" "}
              <Button onClick={() => setNewUser(true)} size={"mid"}>
                Create a new account
              </Button>
            </div>
          ) : (
            <div className={styles.container__switch_contents}>
              <p>Already have an account?</p>
              <Button onClick={() => setNewUser(false)} size={"mid"}>
                Log In
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
