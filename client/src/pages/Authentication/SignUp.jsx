import { useState } from "react";
import { Helmet } from "react-helmet";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Select } from "antd";
import uploadImage from "../../helper/Cloudinary";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Flex, Upload } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [data, setData] = useState({
    userId: localStorage.getItem("userId"),
    avatar: "",
    college: "",
    branch: "",
    year: "",
    skills: [],
  });

  const navigate = useNavigate();

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleTagsChange = (e) => {
    setData({ ...data, skills: e });
  };

  const handleImageChange = async (e) => {
    setImageLoading(true);
    const file = e.file.originFileObj;
    const res = await uploadImage(file);
    if (res.success) {
      setImageLoading(false);
      setImageUrl(res.data);

      setData({ ...data, avatar: res.data });
    }
  };

  const handleOnSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    e.stopPropagation();
    axios
      .post(`${import.meta.env.VITE_SERVER_URI}/user/save-details`, data, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          navigate("/app/auth/signin");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message);
        setLoading(false);
      });
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {imageLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <>
      <Helmet>
        <title>Sign Up - UplinQ</title>
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
          <div className="flex justify-center py-4 lg:px-8 max-w-xl w-full text-center ">
            <form action="submit" onSubmit={handleOnSubmit} className="w-full">
              <div className="w-full mb-4  flex flex-col items-start">
                <label
                  htmlFor="avatar"
                  className="mb-2 text-slate-600 font-semibold"
                >
                  Avatar
                </label>
              <Upload
                name="avatar"
                listType="picture-circle"
                  className="avatar-uploader"
                  style={{ width: "150px", height: "150px", margin: " 0 100px  0" }}
                showUploadList={false}
                // beforeUpload={beforeUpload}
                onChange={handleImageChange}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" className="w-full h-full rounded-full" />
                ) : (
                  uploadButton
                )}
              </Upload>
              </div>

              <div className="mb-4 flex flex-col items-start">
                <label
                  htmlFor="college"
                  className="mb-2 text-slate-600 font-semibold"
                >
                  College Name
                </label>
                <input
                  type="text"
                  name="college"
                  onChange={handleOnchange}
                  placeholder="Enter your college name"
                  className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring focus:ring-blue-400"
                />
              </div>
              <div className="mb-4 flex flex-col items-start">
                <label
                  htmlFor="branch"
                  className="mb-2 text-slate-600 font-semibold"
                >
                  Branch/Course
                </label>
                <input
                  type="text"
                  name="branch"
                  onChange={handleOnchange}
                  placeholder="Enter your branch"
                  className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring focus:ring-blue-400"
                />
              </div>

              <div className="mb-4 flex flex-col items-start">
                <label
                  htmlFor="year"
                  className="mb-2 text-slate-600 font-semibold"
                >
                  Year
                </label>
                <select
                  name="year"
                  id="year"
                  value={data.year}
                  onChange={handleOnchange}
                  className="border border-gray-300 rounded-lg py-2.5 px-4 w-full appearance-none focus:outline-none focus:ring focus:ring-blue-400"
                >
                  <option value="" disabled selected hidden>
                    Select year
                  </option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
              </div>

              <div className="mb-4 flex flex-col items-start">
                <label
                  htmlFor="branch"
                  className="mb-2 text-slate-600 font-semibold"
                >
                  Skills
                </label>
                <Select
                  mode="tags"
                  name="tags"
                  style={{ width: "100%" }}
                  placeholder="Tags Mode"
                  onChange={handleTagsChange}
                />
              </div>

              <button
                type="submit"
                className={` bg-[#4e46e5e1]    text-white font-semibold py-2.5 px-4 mb-4 mt-2 rounded w-full`}
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
                    <span className="ml-2">Saving...</span>
                  </span>
                ) : (
                  "Save Details"
                )}
              </button>
            </form>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default SignUp;
