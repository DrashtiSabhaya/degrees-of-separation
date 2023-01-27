import "./card.css";
import { ReactComponent as People } from "../../assets/people.svg";

const UserCard = () => {
  return (
    <div className="container">
      <div className="user-icon">
        <People height={80} />
      </div>
      <div className="card-title">USER</div>
      <div className="inputs">
        <label>Name</label>
        <input type="text" placeholder="John Doe" />
        <button type="submit">Save</button>
      </div>
    </div>
  );
};

export default UserCard;
