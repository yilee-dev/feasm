import axios from "axios";

export const loginPost = async (
  loginParam: LoginForm
): Promise<LoginResponse> => {
  const header = {
    headers: {
      "Content-Type": "x-www-form-urlencoded",
    },
  };

  const formData = new FormData();
  formData.append("username", loginParam.email);
  formData.append("password", loginParam.password);

  const res = await axios.post(
    "http://localhost:8080/api/members/login",
    formData,
    header
  );

  return res.data;
};
