import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const MySwal = withReactContent(Swal);

  const [inputs, setInputs] = useState({});
  const cors = require("cors");

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      username: inputs.username,
      password: inputs.password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:3500/auth/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          Swal.fire({
            text: "เข้าสู่ระบบเสร็จสิ้น",
            icon: "success",
          }).then((value) => {
            localStorage.setItem("token", result.accessToken);
            navigate("/main_page");
          });
        } 
        else if(result.statusCode === 404){
          Swal.fire({
            text: "ไม่พบข้อมูลผู้ใช้ กรุณาสมัครสมาชิก",
            icon: "error",
          });

        }else if(result.statusCode === 500) {
          Swal.fire({
            text: "กรุณากรอกข้อมูลให้ครบถ้วน",
            icon: "error",
          });
        }else if(result.statusCode === 401) {
          Swal.fire({
            text: "รหัสผ่านไม่ถูกต้อง",
            icon: "error",
          });
        }
      })
      .catch((error) => console.log("error", error));

    console.log(inputs);
  };

  return (
    <div className="">
      <div className="">
        <Navbar />

        <div className="grid justify-items-center mt-20">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow rounded px-8 pt-6 pb-8 mb-4 w-1/4"
          >
            <label className="mt-10 text-2xl font-bold">
              <p className="mb-10">เข้าสู่ระบบ</p>
            </label>

            <label className="">
              <p className="my-3 text-lg font-bold ">ชื่อผู้ใช้</p>
              <div class="relative">
                <input
                  class="peer shadow text-lg py-3 px-4 ps-11 block w-full text-gray-700 leading-tight border rounded-lg"
                  type="text"
                  name="username"
                  value={inputs.username || ""}
                  onChange={handleChange}
                  placeholder="Username"
                />
                <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                  <svg
                    class="w-[12px] h-[12px] text-gray-600 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 18"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                      d="M7 8a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-2 3h4a4 4 0 0 1 4 4v2H1v-2a4 4 0 0 1 4-4Z"
                    />
                  </svg>
                </div>
              </div>
            </label>

            <label className="">
              <p className="my-3 text-lg font-bold">รหัสผ่าน</p>
              <div class="relative">
                <input
                  class="peer shadow text-lg py-3 px-4 ps-11 block w-full text-gray-700 leading-tight border rounded-lg"
                  type="password"
                  name="password"
                  value={inputs.password || ""}
                  onChange={handleChange}
                  placeholder="Password"
                />
                <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                  <svg
                    class="w-[12px] h-[12px] text-gray-600 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                      d="M11.5 8V4.5a3.5 3.5 0 1 0-7 0V8M8 12v3M2 8h12a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"
                    />
                  </svg>
                </div>
              </div>
            </label>

            <input
              value="เข้าสู่ระบบ"
              className="mt-10 text-2xl shadow bg-violet-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded w-full"
              type="submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
