import { useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const GetStarted = () => {
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleOnSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    e.stopPropagation();
    axios
      .post(`${import.meta.env.VITE_SERVER_URI}/user/register`, data, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("userId", res.data?.data?._id);
          navigate("/app/auth/signup");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message);
        setLoading(false);
      });
  };

  const emailValidator = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const generateOtp = () => {
    setGeneratedOtp(Math.floor(100000 + Math.random() * 900000));
    localStorage.setItem("otp", generatedOtp);
  };

  useEffect(() => {
    generateOtp();
  }, []);

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    const res = emailValidator(data.email);
    if (res) {
      setOtpLoading(true);
      axios
        .post(
          `${import.meta.env.VITE_SERVER_URI}/user/email-validation`,
          { email: data.email },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.status === 200) {
            axios
              .post(`${import.meta.env.VITE_SERVER_URI}/email/send-otp`, {
                email: data.email,
                otp: generatedOtp,
              })
              .then((res) => {
                setOtpLoading(false);
                if (res.status === 200) {
                  setShowOtpInput(true);
                  toast.success("OTP sent successfully");
                }
              })
              .catch((err) => {
                toast.error("Failed to send OTP");
                setOtpLoading(false);
                console.log(err);
              });
          }
        })
        .catch((err) => {
          toast.error("Email already exists");
          setOtpLoading(false);
          console.log(err);
        });
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setVerifyLoading(true);

    if (generatedOtp || localStorage.getItem("otp") == enteredOtp) {
      setEmailVerified(true);
      setVerifyLoading(false);
      setShowOtpInput(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Get Started - UplinQ</title>
        <meta
          name="description"
          content="Sign Up - UplinQ Senior Junior Connect"
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
            Get Started
          </h1>
          <p className="text-gray-600 mb-6">Create an account to get started</p>
          <div className="flex justify-center py-4 lg:px-8 max-w-xl w-full text-center ">
            <form action="submit" onSubmit={handleOnSubmit} className="w-full">
              <div className="mb-4 flex flex-col items-start">
                <label
                  htmlFor="name"
                  className="mb-2 text-slate-600 font-semibold"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={handleOnchange}
                  placeholder="name"
                  className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring focus:ring-blue-400"
                />
              </div>
              <div className="mb-4 flex flex-col items-start">
                <label
                  htmlFor="email"
                  className="mb-2 text-slate-600 font-semibold"
                >
                  Email
                </label>
                <div className="flex items-center gap-2 w-full">
                  <input
                    type="email"
                    name="email"
                    onChange={handleOnchange}
                    readOnly={showOtpInput || otpLoading || emailVerified}
                    placeholder="Email"
                    className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring focus:ring-blue-400"
                  />
                  <button
                    disabled={emailVerified || otpLoading || showOtpInput}
                    className={`${data.email === "" ? "hidden" : ""}
                        
                        ${
                          showOtpInput
                            ? "bg-[#2db99d] text-white"
                            : emailVerified
                            ? "bg-green-100 text-green-600"
                            : "bg-[#27d2b0] text-white"
                        }
                      
                       px-2 py-2 font-medium w-28 text-sm  rounded cursor-pointer`}
                    onClick={handleOtpSubmit}
                  >
                    {otpLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-white border-t-[var(--primary)] rounded-full animate-spin"></div>
                      </div>
                    ) : emailVerified ? (
                      "Verified"
                    ) : showOtpInput ? (
                      "Sent "
                    ) : (
                      "Send otp"
                    )}
                  </button>
                </div>
              </div>
              {showOtpInput && (
                <div className={`mb-4 flex items-center justify-self-start `}>
                  <input
                    type="text"
                    name="otp"
                    maxLength={6}
                    onChange={(e) => {
                      setEnteredOtp(e.target.value);
                    }}
                    placeholder="------"
                    className="border border-gray-300 rounded-lg text py-2 px-4 tracking-[18px] w-48 focus:outline-none focus:ring focus:ring-blue-400"
                  />
                  {enteredOtp && (
                    <button
                      className={`px-2 py-2 text-[#27d2b0] w-24 text-sm border border-[#27d2b0] rounded cursor-pointer ml-2`}
                      onClick={handleVerifyOtp}
                    >
                      {verifyLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="w-6 h-6 border-2 border-white border-t-[var(--primary)] rounded-full animate-spin"></div>
                        </div>
                      ) : (
                        "Verify"
                      )}
                    </button>
                  )}
                </div>
              )}

              {emailVerified && (
                <div className="w-full mb-4 flex flex-col items-start">
                  <label
                    htmlFor="password"
                    className="mb-2 text-slate-600 font-semibold"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    readOnly={!emailVerified}
                    onChange={handleOnchange}
                    placeholder="Password"
                    className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring focus:ring-blue-400"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={!emailVerified}
                className={`${
                  emailVerified
                    ? "cursor-pointer hover:bg-[#4F46E5]]"
                    : "cursor-not-allowed"
                } bg-[#4e46e5e1]    text-white font-semibold py-2.5 px-4 mb-4 mt-2 rounded w-full`}
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
                  "Get Started"
                )}
              </button>
            </form>
          </div>
          <p className="text-gray-600 mb-6">
            Already have an account ?
            <a
              href="/app/auth/signin"
              className={`text-sky-600 hover:text-sky-700 font-medium ml-2`}
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default GetStarted;
