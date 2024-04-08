import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Profile = () => {
  const { user, logOut, setUser } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        console.log("log out successful");
        setUser(null);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="flex min-h-screen flex-col justify-center items-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{user.displayName || "User name not found"}</h2>
          <p>{user.email || "Email not found"}</p>
          <div className="card-actions justify-end">
            <button onClick={handleLogOut} className="btn btn-error">
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
