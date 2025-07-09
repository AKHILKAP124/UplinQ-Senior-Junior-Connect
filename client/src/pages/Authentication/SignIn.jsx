import React, { useEffect } from "react";
import { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/userSlice";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    userCredentials: "",
    password: "",
  });
  const navigate = useNavigate();
  const [remember, setRemember] = useState(false);
  const {user} = useSelector((state) => state.user);
  const dispatch = useDispatch();

    useEffect(() => {
      if (user.name) {
        navigate("/app/dashboard");
      }
      const saveData = localStorage.getItem("rememberMe");
      if (saveData) {
        setData(JSON.parse(saveData));
        setRemember(true);
      }
    }, []);

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_SERVER_URI}/user/login`, data, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          if (remember) {
            localStorage.setItem("rememberMe", JSON.stringify(data));
          }
          dispatch(setUser(res?.data?.data));
          setLoading(false);
          toast.success(res?.data?.message);
          navigate("/app/dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message);
        setLoading(false);
      });
  };

  return (
    <>
      <Helmet>
        <title>Sign In - UplinQ</title>
        <meta
          name="description"
          content="Sign In - UplinQ Senior Junior Connect"
        />
      </Helmet>
      <div
        className="flex flex-col items-center justify-center h-screen relative px-5 lg:px-0"
        style={{
          backgroundImage:
            "url('https://i.ibb.co/zhhdn7xy/Screenshot-2025-07-08-164011.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-20 z-10"></div>
        <div className="p-6 max-w-xl lg:max-w-lg w-full text-center bg-white shadow-md border-2 border-slate-100 rounded-lg z-20 relative">
          <h1 className="text-2xl text-slate-800 font-semibold mb-2">
            Sign In
          </h1>
          <p className="text-gray-600 mb-6">Sign in to continue to UPLINQ.</p>
          <div className="flex justify-center py-12 lg:px-8 max-w-xl w-full text-center ">
            <form action="submit" onSubmit={handleOnSubmit} className="w-full">
              <div className="mb-4 flex flex-col items-start">
                <label
                  htmlFor="email"
                  className="mb-2 text-slate-600 font-medium"
                >
                  Username / E-mail
                </label>
                <input
                  type="text"
                  name="userCredentials"
                  defaultValue={data.userCredentials}
                  onChange={handleOnchange}
                  placeholder="username or example@gamil.com"
                  className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring focus:ring-blue-400"
                />
              </div>
              <div className="w-full mb-4 flex flex-col items-start relative">
                <label
                  htmlFor="password"
                  className="mb-2 text-slate-600 font-medium"
                >
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  defaultValue={data.password}
                  onChange={handleOnchange}
                  placeholder="Password"
                  className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring focus:ring-blue-400 "
                />
                <span
                  className="absolute right-3 top-11 transform -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <IoEyeOutline size={20} />
                  ) : (
                    <IoEyeOffOutline size={20} />
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between mb-6 ">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="mr-1 cursor-pointer"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  <label
                    htmlFor="remember"
                    className="text-gray-600 text-sm cursor-pointer"
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="/auth/forget/reset-password"
                  className=" text-gray-400 hover:text-gray-600"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                disabled={
                  loading || !data.userCredentials || !data.password
                }
                className={`  ${
                  loading || !data.userCredentials || !data.password
                    ? "opacity-60 cursor-not-allowed bg-[#4e46e5e1]"
                    : "bg-[#4e46e5e1] hover:bg-[#4F46E5]"
                } cursor-pointer text-white font-medium py-2.5 px-4 rounded w-full`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      viewBox="3 3 18 18"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 3v2a9 9 0 1 0 9 9h2a11 11 0 1 1-11-11z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="ml-2">Loading...</span>
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
          </div>
          <p className="text-gray-600 mb-6">
            Don't have an account ?
            <a
              href="/app/auth/signup"
              className={`text-sky-600 hover:text-sky-700 font-medium ml-2`}
            >
              SignUp now
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;
