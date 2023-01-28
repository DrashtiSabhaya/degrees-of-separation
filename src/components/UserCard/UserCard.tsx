import "./card.css";
import { ReactComponent as People } from "../../assets/people.svg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessages, saveUser } from "../../store/users/actions";
import { RootState } from "../../constants/types";

const UserCard = () => {
  const dispatch = useDispatch();
  const { status, error, sucessMessage } = useSelector((state: RootState) => state.users);

  const [userName, setUserName] = useState<string>("");
  const [nameError, setNameError] = useState<boolean>(false);

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (error && e.target.value.length) setNameError(false);
    setUserName(e.target.value);
  };

  const onSave = async () => {
    if (userName.length) {
      await dispatch(saveUser(userName));
      setUserName("");
    } else {
      setNameError(true);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearMessages());
    };
  }, []);

  return (
    <div className="container">
      <div className="user-icon">
        <People height={80} />
      </div>
      <div className="card-title">USER</div>
      <div className="inputs">
        <label>Name</label>
        <input type="text" value={userName} placeholder="John Doe" onChange={onNameChange} />
        {nameError && <div className="error-text">Please enter a valid name</div>}
        <button type="submit" onClick={onSave}>
          {status === "saving" ? <div className="loader" /> : "Save"}
        </button>
        {error && <div className="error-text">{error.message}</div>}
        {sucessMessage && <div className="success-message">{sucessMessage}</div>}
      </div>
    </div>
  );
};

export default UserCard;
