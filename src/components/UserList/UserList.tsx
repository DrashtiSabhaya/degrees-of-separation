import { ReactComponent as People } from "../../assets/people.svg";

const UserList = () => {
  return (
    <div className="container user-list">
      <div className="user-list-container">
        <People height={30} />
        <div className="user-name">User Test</div>
      </div>
      <div className="user-list-container">
        <People height={30} />
        <div className="user-name">Drashti Test</div>
      </div>
      <div className="user-list-container">
        <People height={30} />
        <div className="user-name">Drashti</div>
      </div>
      <div className="user-list-container">
        <People height={30} />
        <div className="user-name">Drashti</div>
      </div>
      <div className="user-list-container">
        <People height={30} />
        <div className="user-name">Drashti Sabhaya</div>
      </div>
    </div>
  );
};

export default UserList;
