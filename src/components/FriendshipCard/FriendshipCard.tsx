interface FriendshipProps {
  tabName: string;
}

const FriendshipCard = ({ tabName }: FriendshipProps) => {
  return (
    <div className="container">
      <div className="inputs">
        <label>1st Friend Name</label>
        <input type="text" placeholder="John Doe" />
      </div>
      <div className="inputs">
        <label>2nd Friend Name</label>
        <input type="text" placeholder="Jenny Des" />
        <button type="submit">Save</button>
      </div>
    </div>
  );
};

export default FriendshipCard;
