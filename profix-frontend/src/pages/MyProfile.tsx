import useAuth from "../hooks/useAuth";
import { IUser } from "../types";

const MyProfile = () => {
  const localUser = localStorage.getItem("profix_user");
  if (localUser) {
    console.log(localUser);
  }

  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <>Usuario no auteticado</>;
  }
  return (
    <ul>
      {Object.entries(user as IUser).map(([key, val]) => (
        <li>
          {key} : {val}
        </li>
      ))}
    </ul>
  );
};

export default MyProfile;
