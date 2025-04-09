import { ChangeEvent, useState } from "react";
import useCustomLogin from "../../hooks/useCustomLogin";
import { useLocation, useNavigate } from "react-router";

const initState: LoginForm = {
  email: "",
  password: "",
};

export default function LoginComponent() {
  const [loginParam, setLoginParam] = useState<LoginForm>({ ...initState });

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from || "/";

  const { doLogin, moveToPath } = useCustomLogin();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginParam((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClick = () => {
    doLogin(loginParam).then((data) => {
      if (data.error) {
        console.log("login fail");
      } else {
        navigate(from, { replace: true });
      }
    });
  };

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      <div className="flex justify-center">
        <div className="text-4xl m-4 p-4 font-extrabold text-blue-500">
          Login Component
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-full p-3 text-left font-bold">Email</div>
          <input
            className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
            name="email"
            type={"text"}
            value={loginParam.email}
            onChange={handleChange}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-full p-3 text-left font-bold">Password</div>
          <input
            className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
            name="password"
            type={"password"}
            value={loginParam.password}
            onChange={handleChange}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full justify-center">
          <div className="w-2/5 p-6 flex justify-center font-bold">
            <button
              className="rounded p-4 w-36 bg-blue-500 text-xl text-white"
              onClick={handleClick}
            >
              LOGIN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
