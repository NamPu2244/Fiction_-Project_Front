import { useState, useEffect, useParams } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Charcreate(id) {
  const navigate = useNavigate();
  // const { id } = useParams();
  const [file, setFile] = useState({ preview: "", data: "" });
  // const [category, setCategory] = useState("");
  // const [status, setStatus] = useState();
  const [roleAs, setroleAs] = useState();
  const [name, setName] = useState();
  const MySwal = withReactContent(Swal);

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    var formdata = new FormData();
    formdata.append("file", file.data);
    formdata.append("name", name);
    if (roleAs != null || "" || undefined) {
      formdata.append("roleAs", roleAs);
      console.log(roleAs);
    }
    formdata.append("workId", id.data);

    console.log(file.data);
    console.log(name);
    console.log(id.data);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:3500/characters", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.statusCode === 200) {
          Swal.fire({
            text: "success",
            icon: "success",
          });
        } else {
          Swal.fire({
            text: "กรุณากรอกข้อมูล",
            icon: "error",
          });
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleFile = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setFile(img);
  };

  console.log(id);

  return (
    <div className="my-12">
      <div>
        <div className="grid grid-cols-12">
          <div className="col-start-1 col-end-4 grid justify-items-center">
            {file.preview ? (
              <img src={file.preview} width="224" height="299"></img>
            ) : (
              <label
                for="dropzone-file"
                class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    width="70"
                    height="53"
                    viewBox="0 0 70 53"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.05172 9.36853L17.2131 7.5083V41.3608L12.3018 42.3947C9.01306 43.0871 5.79705 40.9434 5.17081 37.6414L1.14319 16.4049C0.515988 13.0978 2.73148 9.92191 6.05172 9.36853Z"
                      fill="white"
                      stroke="#6F5EE0"
                      stroke-width="2"
                    />
                    <path
                      d="M63.9483 9.36853L52.7869 7.5083V41.3608L57.6982 42.3947C60.9869 43.0871 64.203 40.9434 64.8292 37.6414L68.8568 16.4049C69.484 13.0978 67.2685 9.92191 63.9483 9.36853Z"
                      fill="white"
                      stroke="#6F5EE0"
                      stroke-width="2"
                    />
                    <g filter="url(#filter0_dd_313_20424)">
                      <rect
                        x="16.0664"
                        y="0.623047"
                        width="37.8689"
                        height="44.7541"
                        rx="6"
                        fill="white"
                      />
                      <rect
                        x="17.0664"
                        y="1.62305"
                        width="35.8689"
                        height="42.7541"
                        rx="5"
                        stroke="#6F5EE0"
                        stroke-width="2"
                      />
                    </g>
                    <path
                      d="M47.9353 44.3772H22.0664C19.305 44.3772 17.0664 42.1386 17.0664 39.3772L17.0664 35.9161L29.4732 22.7682L38.9834 33.7121C39.7841 34.6335 41.2162 34.629 42.011 33.7025L47.2464 27.5996L52.9353 33.7209V39.3772C52.9353 42.1386 50.6967 44.3772 47.9353 44.3772Z"
                      fill="#6F5EE0"
                      fill-opacity="0.25"
                      stroke="#6F5EE0"
                      stroke-width="2"
                    />
                    <circle
                      cx="39.5897"
                      cy="14.9674"
                      r="4.16393"
                      fill="#6F5EE0"
                      fill-opacity="0.25"
                      stroke="#6F5EE0"
                      stroke-width="2"
                    />
                    <defs>
                      <filter
                        id="filter0_dd_313_20424"
                        x="13.0664"
                        y="0.623047"
                        width="43.8691"
                        height="51.7542"
                        filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB"
                      >
                        <feFlood
                          flood-opacity="0"
                          result="BackgroundImageFix"
                        />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dy="2" />
                        <feGaussianBlur stdDeviation="1" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_313_20424"
                        />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dy="4" />
                        <feGaussianBlur stdDeviation="1.5" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="effect1_dropShadow_313_20424"
                          result="effect2_dropShadow_313_20424"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect2_dropShadow_313_20424"
                          result="shape"
                        />
                      </filter>
                    </defs>
                  </svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">รูปภาพตัวละคร</span>
                  </p>
                  {/* <p class="text-xs text-gray-500 dark:text-gray-400">
                    ขนาดไฟล์ไม่เกิน : 1MB
                  </p> */}
                </div>
                {/* <input id="dropzone-file" type="file" class="hidden" /> */}
              </label>
            )}

            {/* <label
              for="file-upload"
              class="bg-danger  rounded-xl cursor-pointer "
            >efegergeg</label>

            <input
              type="file"
              name="file-upload"
              className="flex mt-5 "
              onChange={handleFile}
            /> */}

            <label
              for="file-upload"
              class="bg-white border py-3.5 px-4 mt-5 w-full text-center font-bold rounded-lg cursor-pointer "
            >
              <p className="inline-flex gap-2 self-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-upload"
                  viewBox="0 0 16 16"
                >
                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                  <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
                </svg>
                อัพโหลดรูปภาพ
              </p>
            </label>
            <input
              className="invisible "
              type="file"
              id="file-upload"
              name="file"
              onChange={handleFile}
            />
          </div>

          <div className="col-start-5 col-end-13">
            <div className="mb-8">
              <label class=" text-gray-900 dark:text-white">
                <p className="my-3 text-lg font-bold">ชื่อตัวละคร</p>
                <input
                  class="border text-lg font-bold border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  placeholder="ชื่อตัวละคร"
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </label>
            </div>

            <div className="mb-4">
              <label for="roleAs" class=" text-gray-900 dark:text-white">
                <p className="my-3 text-lg font-bold">บทบาทตัวละคร</p>
                <select
                  id="roleAs"
                  class="bg-gray-50 border text-lg font-bold border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => setroleAs(e.target.value)}
                >
                  <option>เลือกบทบาท</option>
                  <option value="Hero">พระเอก</option>
                  <option value="Heroine">นางเอก</option>
                  <option value="Villain">ตัวร้าย</option>
                  <option value="Main">ตัวละครหลัก</option>
                </select>
              </label>
            </div>

            <div className="mt-8">
              <div className="grid grid-cols-2 gap-4">
                <button className="w-full inline-flex items-center gap-x-2  text-lg text-start shadow bg-violet-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-save"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1z" />
                  </svg>
                  บันทึก
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Charcreate;
