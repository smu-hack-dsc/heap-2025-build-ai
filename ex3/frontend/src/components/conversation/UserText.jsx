// YOU DO NOT NEED TO TOUCH THIS FILE

const UserText = ({ parts }) => (
  <div className="flex justify-end">
    <div className="chat-container-user">
    {parts.map((part, i) => (
      <p key={i}>{part.text}</p>
    ))}
    </div>
  </div>
)

export default UserText
