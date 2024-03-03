import "./Createpage.css";
import { useState, useEffect } from "react";
import { Dropdown } from "flowbite-react";
import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import Navbarread from "./Navbarread";
import Navbarcreator from "./Navbarceartor";
import Charcreate from "./Character/Charcreate";

function Createpage() {
  const navigate = useNavigate();

  const MySwal = withReactContent(Swal);

  const [title, setTitle] = useState("");
  const [file, setFile] = useState({ preview: "", data: "" });
  const [tagline, setTagline] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [intro, setIntro] = useState("");
  const [status, setStatus] = useState("hidden");

  const [isLoaded, setIsLoaded] = useState(true);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:3500/auth/getProfile", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          setUser(result.user);
          setIsLoaded(false);
        } else if (result.message === "Unauthorized") {
          Swal.fire({
            text: "กรุณา Login",
            icon: "error",
          }).then((value) => {
            navigate("/login");
          });
        }
      })
      .catch((error) => console.log("error", error));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let validate = true;

    const inputType = [title, tagline];
    inputType.forEach((item) => {
      console.log(item)
      if (item === "" || null || undefined) {
        validate = false;
        Swal.fire({
          text: `กรุณากรอกข้อมูล`,
          icon: "error",
        });
      }
    });

    if (validate === true) {
      const token = localStorage.getItem("token");
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + token);
      var formdata = new FormData();
      formdata.append("file", file.data);
      formdata.append("title", title);
      if (status != null || "" || undefined) {
        formdata.append("status", status);
      }
      formdata.append("intro", intro);
      formdata.append("tagline", tagline);
      formdata.append("category", category);
      formdata.append("type", type);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      fetch("http://127.0.0.1:3500/works", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.status === 200) {
            Swal.fire({
              text: "success",
              icon: "success",
            }).then((window.location.href = "/workpage"));
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
    }
  };

  const handleFile = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setFile(img);
  };

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const Backto = () => {
    // ตรวจสอบว่าแต่ละฟิลด์มีค่าหรือไม่
    const hasTitle = title !== "";
    const hasStatus = status !== "";
    const hasIntro = intro !== "";
    const hasTagline = tagline !== "";
    const hasCategory = category !== "";
    const hasType = type !== "";

    // ถ้ามีฟิลด์ใด ๆ มีค่า ให้ขึ้น swal
    if (
      hasTitle ||
      hasStatus ||
      hasIntro ||
      hasTagline ||
      hasCategory ||
      hasType
    ) {
      Swal.fire({
        title: "ต้องการย้อนกลับหรือไม่",
        text: "หากคุณยืนยัน ข้อมูลที่กรอกจะหายไป",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        // ถ้ากดยืนยัน ให้ไปหน้าหลัก
        if (result.value) {
          navigate("/main_page");
        }
      });
    }
  };

  return (
    <div>
      {user.role === "MEMBER" && <Navbarread />}
      {user.role === "CREATOR" && <Navbarcreator />}

      <form
        onSubmit={handleSubmit}
        className="w-6/12 m-auto container mx-auto  "
      >
        <div className="border rounded-lg bg-white px-12">
          <div className="grid grid-cols-12 py-12">
            <div className="col-start-1 col-end-4 grid justify-items-center">
              {/* {file.preview && (
                <img src={file.preview} width="100" height="100" ></img>
              )} */}
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
                      <span class="font-semibold">รูปภาพหน้าปก</span>
                    </p>
                    {/* <p class="text-xs text-gray-500 dark:text-gray-400">
                      อัพโหลดได้ 1 รูป เท่านั้น
                    </p> */}
                  </div>
                  {/* <input id="dropzone-file" type="file" class="hidden" /> */}
                </label>
              )}

              {/* <input
                type="file"
                name="file"
                className="flex "
                onChange={handleFile}
              /> */}

              <label
                for="file"
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
                id="file"
                name="file"
                onChange={handleFile}
              />
            </div>

            <div className="col-start-5 col-end-13">
              <div>
                <div className="grid grid-cols-12 ">
                  <div className="col-start-1 col-end-10 mb-4">
                    <label
                      for="with-corner-hint"
                      class="block text-lg font-bold mb-2 dark:text-white"
                    >
                      ชื่อเรื่อง<a className="text-danger"> *</a>
                      <input
                        type="text"
                        id="with-corner-hint"
                        class="py-3 px-4 block w-full border-gray-200 rounded-lg text-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        placeholder="title"
                        onChange={(e) => setTitle(e.target.value)}
                      ></input>
                    </label>
                  </div>

                  <div className="col-start-11 col-end-11">
                    <p className="text-lg font-bold">เผยแพร่ </p>
                    <input
                      type="checkbox"
                      id="hs-basic-usage"
                      class="relative w-[3.25rem] h-7 p-px bg-gray-100 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-blue-600 disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-blue-600 checked:border-blue-600 focus:checked:border-blue-600 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-600
                          before:inline-block before:w-6 before:h-6 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-blue-200"
                      value={status}
                      onChange={(e) => {
                        if (e.target.checked) {
                          e.target.value = "public"; // Set value to 'public' when checked
                          setStatus(e.target.value);
                        } else {
                          e.target.value = "hidden"; // Set value to 'public' when checked
                          setStatus(e.target.value);
                        }
                      }}
                    />
                    <label for="hs-basic-usage" class="sr-only">
                      เผยแพร่{" "}
                    </label>
                  </div>
                </div>

                <label
                  for="with-corner-hint"
                  class="block text-lg font-bold mb-2 dark:text-white"
                >
                  คำโปรย<a className="text-danger"> *</a>
                  <textarea
                    type="text"
                    id="with-corner-hint"
                    class="py-3 px-4 block w-full h-24 border-gray-200 rounded-lg text-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                    placeholder="tagline"
                    onChange={(e) => setTagline(e.target.value)}
                  ></textarea>
                </label>
              </div>

              <div className="grid grid-cols-2">
                <label className="">
                  <p className="my-3 text-lg font-bold">ประเภท<a className="text-danger"> *</a></p>

                  <div className="flex gap-6">
                    <input
                      className="accent-primary "
                      type="radio"
                      name="type"
                      value="FICTION"
                      id="fiction"
                      onChange={(e) => setType(e.target.value)}
                    />
                    <label htmlFor="fiction" className="font-bold text-lg">
                      นวนิยาย
                    </label>

                    <input
                      className="accent-primary font-bold text-lg"
                      type="radio"
                      name="type"
                      value="CARTOON"
                      id="cartoon"
                      onChange={(e) => setType(e.target.value)}
                    />
                    <label htmlFor="cartoon" className="font-bold text-lg">
                      การ์ตูน
                    </label>
                  </div>
                </label>

                <label for="countries" class=" text-gray-900 dark:text-white">
                  <p className="my-3 text-lg font-bold">หมวดหมู่<a className="text-danger"> *</a></p>
                  <select
                    id="countries"
                    class="bg-gray-50 border text-lg font-bold border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option>เลือกหมวดหมู่</option>
                    <option value="Love">ความรัก</option>
                    <option value="Comedy">ตลก</option>
                    <option value="Horror">สยองขวัญ</option>
                    <option value="Secret">สืบสวนสอบสวน</option>
                  </select>
                </label>
              </div>
            </div>
          </div>

          <hr class="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
<p className="pt-8 pb-4 text-xl font-bold">แนะนำเรื่อง</p>
          <div className="flex justify-center  pb-12">
            
            <Editor
              apiKey="b0cflehrofjbs4hfxcodrxozkigdl4o2lbnvpvoi0q9r34lv"
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue=""
              placeholder="พิมพ์ข้อความ....."
              onChange={(e) => setIntro(e.level.content)}
              init={{
                height: 288,
                width: 944,
                menubar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
          </div>

          <hr class="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>

          <div className="mt-5">
            <div
              class="bg-red-100 text-red-700 font-bold text-xl px-4 py-3 rounded relative"
              role="alert"
            >
              <span class="inline-flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-exclamation-triangle-fill self-center"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                </svg>
                คุณต้องสร้างผลงานก่อนจึงจะสามารถสร้างตัวละครได้
              </span>
            </div>
            <div className="my-12 rounded opacity-50">
              <div>
                <div className="grid grid-cols-12">
                  <div className="col-start-1 col-end-4 grid justify-items-center">
                    {/* {file.preview ? (
                      <img
                        className=""
                        src={file.preview}
                        width="224"
                        height="299"
                        disabled
                      ></img>
                    ) : ( */}
                      <label
                        for="dropzone-file"
                        class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
                            อัพ
                          </p> */}
                        </div>
                        {/* <input id="dropzone-file" type="file" class="hidden" /> */}
                      </label>
                    {/* )} */}

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
                      class="bg-white border py-3.5 px-4 mt-5 w-full text-center font-bold rounded-lg"
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
                      disabled
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
                          disabled
                        ></input>
                      </label>
                    </div>

                    <div className="mb-4">
                      <label
                        for="roleAs"
                        class=" text-gray-900 dark:text-white"
                      >
                        <p className="my-3 text-lg font-bold">บทบาทตัวละคร</p>
                        <select
                          disabled
                          id="roleAs"
                          class="bg-gray-50 border text-lg font-bold border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                      <div className="grid grid-cols-2">
                        <div className="grid grid-cols-2 gap-4">
                          <button className="w-full inline-flex items-center gap-x-2  text-lg text-start shadow bg-violet-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
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
            </div>
          </div>
        </div>

        <div className="flex justify-around gap-7 mt-6 mb-20">
          <button
            onClick={Backto}
            type="button"
            className="w-full inline-flex items-center gap-x-2 mt-10 text-lg text-start shadow bg-white hover:bg-purple-400 focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-arrow-left-square"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"
              />
            </svg>
            ย้อนกลับ
          </button>
          <button
            type="submit"
            className=" w-full inline-flex items-center gap-x-2 mt-10 text-lg text-start shadow bg-violet-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          >
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
      </form>
    </div>
  );
}

export default Createpage;
