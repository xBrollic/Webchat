import axios from "../api/index";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({});
    try {
      const response = await axios.get("/logout", {
        withCredentials: true,
      });

      console.log(response?.data?.status);
    } catch (err) {
      console.log(err);
    }
  };

  return logout;
};

export default useLogout;
