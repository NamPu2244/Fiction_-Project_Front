import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Navbar from "./Navbar";

function Register() {
  const [inputs, setInputs] = useState({});
  const [role, setRole] = useState({});

  const navigate = useNavigate();

  const MySwal = withReactContent(Swal);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(inputs);

    if (inputs.password !== inputs.passwordConfirm) {
      Swal.fire({
        text: "รหัสผ่านไม่ตรงกัน กรุณาตรวจสอบอีกครั้ง",
        icon: "error",
      });
      return;
    }

    const requiredFields = [
      "name",
      "username",
      "password",
      "passwordConfirm",
      "email",
      "role",
    ];
    const areAllRequiredFieldsFilled = requiredFields.every(
      (field) => !!inputs[field] && inputs[field].trim() !== ""
    );

    if (!areAllRequiredFieldsFilled) {
      Swal.fire({
        text: "กรุณากรอกข้อมูลให้ครบถ้วน",
        icon: "warning",
      });
      return;
    }

    const thaiCharacters = /[\u0E00-\u0E7F]/;

    if (thaiCharacters.test(inputs.password)) {
      Swal.fire({
        text: "ห้ามกรอกภาษาไทยในช่องรหัสผ่าน",
        icon: "error",
      });
      return;
    }

    if (thaiCharacters.test(inputs.passwordConfirm)) {
      Swal.fire({
        text: "ห้ามกรอกภาษาไทยในช่องยืนยันรหัสผ่าน",
        icon: "error",
      });
      return;
    }

    if (inputs.password.length < 8) {
      Swal.fire({
        text: "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัว",
        icon: "error",
      });
      return;
    }

    if (inputs.username.length < 4) {
      Swal.fire({
        text: "ชื่อผู้ใช้ต้องมีความยาวอย่างน้อย 4 ตัว",
        icon: "error",
      });
      return;
    }

    const regExp = /^[a-zA-Z0-9]+$/;

    if (!regExp.test(inputs.password)) {
      Swal.fire({
        text: "กรุณากรอก Password ด้วยภาษาอังกฤษและตัวเลขเท่านั้น",
        icon: "error",
      });
      return;
    }

    requiredFields.forEach((field) => {
      if (
        (field === "username" || field === "password") &&
        thaiCharacters.test(inputs[field])
      ) {
        Swal.fire({
          text: `ห้ามกรอกภาษาไทยในช่อง "${field}"`,
          icon: "error",
        });
        return;
      }
    });

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name: inputs.name,
      username: inputs.username,
      password: inputs.password,
      passwordConfirm: inputs.passwordConfirm,
      email: inputs.email,
      role: inputs.role,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:3500/users/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
         if (result.massage === "Username Already Exits"){
          Swal.fire({
            text: "ชื่อผู้ใช้เป็นสมาชิกอยู่แล้ว",
            icon: "error",
          });
        }
        
        else if (result) {
          Swal.fire({
            text: "สมัครสมาชิกเสร็จสิ้น",
            icon: "success",
          }).then((value) => {
            navigate("/login");
          });
        } 
        
        else {
          Swal.fire({
            text: "กรุณากรอกข้อมูล",
            icon: "error",
          });
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div>
      <Navbar />
      <div className="grid justify-items-center mt-10 ">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow rounded px-8 pt-6 pb-8 mb-4 w-1/4"
        >
          <label className="mt-10  text-2xl font-bold">
            <p className="mb-10">สมัครสมาชิก</p>
          </label>

          <label className="">
            <p className="my-3 text-lg font-bold">นามปากกา <a className="text-danger">*</a></p>
            <div class="relative">
              <input
                class="peer font-normal shadow text-lg py-3 px-4 ps-11 block w-full text-gray-600 leading-tight border rounded-lg"
                type="text"
                name="name"
                value={inputs.name || ""}
                onChange={handleChange}
                placeholder="Name"
              />
              <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                <svg
                  class="w-[16px] h-[16px] text-gray-600 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                    d="M10 19a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 11 14H9a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 10 19Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </div>
            </div>
          </label>

          <label className="">
            <p className="my-3 text-lg font-bold">อีเมล <a className="text-danger">*</a></p>
            <div class="relative">
              <input
                class="peer font-normal shadow text-lg py-3 px-4 ps-11 block w-full text-gray-600 leading-tight border rounded-lg"
                type="email"
                name="email"
                value={inputs.email || ""}
                onChange={handleChange}
                placeholder="you@mail.com"
                pattern="^[a-zA-Z0-9.@_%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$"
              />
              <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                <svg
                  class="w-[16px] h-[16px] text-gray-600 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                    d="m19 2-8.4 7.05a1 1 0 0 1-1.2 0L1 2m18 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1m18 0v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2"
                  />
                </svg>
              </div>
            </div>
          </label>

          <label className="">
            <p className="my-3 text-lg font-bold">ชื่อผู้ใช้ <a className="text-danger">*</a></p>
            <div class="relative">
              <input
                class="peer font-normal shadow text-lg py-3 px-4 ps-11 block w-full text-gray-600 leading-tight border rounded-lg"
                type="text"
                name="username"
                value={inputs.username || ""}
                onChange={handleChange}
                placeholder="Username"
                pattern="^[a-zA-Z0-9_]+$"
              />
              <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                <svg
                  class="w-[16px] h-[16px] text-gray-600 "
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
            <p className="my-3 text-lg font-bold" >รหัสผ่าน <a className="text-danger">*</a></p>
            <div class="relative">
              <input
                class="peer font-normal shadow text-lg py-3 px-4 ps-11 block w-full text-gray-600 leading-tight border rounded-lg"
                type="password"
                name="password"
                value={inputs.password || ""}
                onChange={handleChange}
                placeholder="Password"
                pattern="^[a-zA-Z0-9_.!@#$%^&*()+-=]+$"
              />
              <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                <svg
                  class="w-[16px] h-[16px] text-gray-600 "
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

          <label className="">
            <p className="my-3 text-lg font-bold">ยืนยันรหัสผ่าน <a className="text-danger">*</a></p>
            <div class="relative">
              <input
                class="peer font-normal shadow text-lg py-3 px-4 ps-11 block w-full text-gray-600 leading-tight border rounded-lg"
                type="password"
                name="passwordConfirm"
                value={inputs.passwordConfirm || ""}
                onChange={handleChange}
                placeholder="Confirm-Password"
              />
              <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                <svg
                  class="w-[16px] h-[16px] text-gray-600 "
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

          <label className="">
            <p className="my-3 text-lg font-bold">บทบาท <a className="text-danger">*</a></p>
            <div className="flex gap-6">
              <input
                className="accent-primary "
                type="radio"
                name="role"
                value="MEMBER"
                id="member"
                defaultChecked={inputs.role === "MEMBER"}
                onChange={handleChange}
              />
              <label htmlFor="member" className="font-bold text-lg">นักอ่าน (Reader)</label>
              <input
                className="accent-primary font-bold text-lg"
                type="radio"
                name="role"
                value="CREATOR"
                id="creator"
                defaultChecked={inputs.role === "CREATOR"}
                onChange={handleChange}
              />
              <label htmlFor="creator" className="font-bold text-lg">นักสร้างสรรค์ (Creator)</label>
              
            </div>
          </label>

          <input
            value="สมัครสมาชิก"
            type="submit"
            className="mt-10 text-2xl shadow bg-violet-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded w-full"
          />
        </form>
      </div>
    </div>
  );
}

export default Register;
