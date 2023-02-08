import axios from "../api/index";
import useAuth from "./useAuth";
import jwt_decode from "jwt-decode";
import jwtDecode from "jwt-decode";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.post(
      "/refresh",
      { rT: localStorage.getItem("rT") } /*, {
      withCredentials: true,
    } */
    );

    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.accessToken);
      return {
        ...prev,
        user: jwtDecode(response.data.accessToken).UserInfo.username,
        accessToken: response.data.accessToken,
      };
      // return { ...prev, accessToken: response.data.accessToken };
    });
    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
