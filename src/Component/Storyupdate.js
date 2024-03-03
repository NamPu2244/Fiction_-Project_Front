import { useState, useEffect } from "react";
import { Dropdown } from "flowbite-react";
import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import Navbarread from "./Navbarread";
import Navbarcreator from "./Navbarceartor";
import { useParams } from "react-router-dom";
import Charupdate from "./Character/Charupdate";
import Charcreate from "./Character/Charcreate";

function Storyupdate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [story, setStory] = useState({}); // State for story data

  const MySwal = withReactContent(Swal);
  const [character, setCharacter] = useState([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState({ preview: "", data: "" });
  const [tagline, setTagline] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [intro, setIntro] = useState({ old: "", new: "" });
  const [status, setStatus] = useState(""); // Set status to an initial value

  const [isLoaded, setIsLoaded] = useState(true);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    fetch(`http://127.0.0.1:3500/works/${id}`, {
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((storyData) => {
        setStory(storyData);
        setTitle(storyData.title);
        setTagline(storyData.tagline);
        setType(storyData.type);
        setCategory(storyData.category);
        setIntro({ old: storyData.intro });
        setStatus(storyData.status);
        setFile({ data: storyData.picture });
        setCharacter(storyData.characters);
      })
      .catch((error) => console.log("error", error));
  }, [id]);

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
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const checkTypeFiction = document.getElementById("fiction");
  const checkTypeCartoon = document.getElementById("cartoon");
  const statusCheck = document.getElementById("statusCheckbox");
  if (statusCheck && checkTypeCartoon && checkTypeFiction) {
    if (type === "FICTION") {
      checkTypeFiction.checked = true;
    }

    if (type === "CARTOON") {
      checkTypeCartoon.checked = true;
    }
    if (status === "public") {
      statusCheck.checked = true;
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission

    const token = localStorage.getItem("token");

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("file", file.data);
    formdata.append("title", title);
    formdata.append("status", status);
    if (intro.new) {
      formdata.append("intro", intro.new);
    } else {
      formdata.append("intro", intro.old);
    }
    formdata.append("tagline", tagline);
    formdata.append("category", category);
    formdata.append("type", type);

    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`http://127.0.0.1:3500/works/${id}`, requestOptions) // Use dynamic ID in URL
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          Swal.fire({
            text: "แก้ไขเสร็จสิ้น",
            icon: "success",
          }).then((value) => {
            navigate("/Storypage/" + id);
          });
        }
      })
      .catch((error) => console.log("error", error));
  };

  const handleFile = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    console.log(img);
    setFile(img);
  };
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  // if (status) {
  //   statusCheck.checked = true;
  // }

  // const Update = id =>{
  //   window.location = '/storypage/' + id
  // }

  const Backto = () => {
    navigate("/workpage");
  };

  console.log(character);
  console.log(id);

  return (
    <div>
      {user.role === "MEMBER" && <Navbarread />}
      {user.role === "CREATOR" && <Navbarcreator />}

      <form
        // onSubmit={handleSubmit}
        className="w-6/12 m-auto container mx-auto  "
      >
        <div className="border rounded-lg bg-white px-12">
          <div className="grid grid-cols-12 py-12">
            <div className="col-start-1 col-end-4 grid justify-items-center">
              {file.preview ? (
                <img
                  src={file.preview}
                  width={224}
                  height={299}
                  className="border rounded-lg w-full mb-4 h-72"
                ></img>
              ) : (
                <img
                  src={`../img/work/` + file.data}
                  width={224}
                  height={299}
                  className="border rounded-lg w-full mb-4 h-72"
                ></img>
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
                      ชื่อเรื่อง
                      <input
                        type="text"
                        id="with-corner-hint"
                        class="py-3 px-4 block w-full border-gray-200 rounded-lg text-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        placeholder="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      ></input>
                    </label>
                  </div>

                  <div className="col-start-11 col-end-11">
                    <p className="text-lg font-bold">เผยแพร่</p>
                    <input
                      type="checkbox"
                      id="statusCheckbox"
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
                        console.log(e.target.value);
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
                  คำโปรย
                  <textarea
                    type="text"
                    id="with-corner-hint"
                    class="py-3 px-4 block w-full h-24 border-gray-200 rounded-lg text-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                    placeholder="tagline"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                  ></textarea>
                </label>
              </div>

              <div className="grid grid-cols-2">
                <label className="">
                  <p className="my-3 text-lg font-bold">ประเภท</p>

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
                  <p className="my-3 text-lg font-bold">หมวดหมู่</p>
                  <select
                    id="countries"
                    class="bg-gray-50 border text-lg font-bold border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                  >
                    <option>เลือกหมวดหมู่</option>
                    <option value={"Love"}>ความรัก</option>
                    <option value={"Comedy"}>ตลก</option>
                    <option value={"Horror"}>สยองขวัญ</option>
                    <option value={"Secret"}>สืบสวนสอบสวน</option>
                  </select>
                </label>
              </div>
            </div>
          </div>

          <hr class="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>

          <div className="flex justify-center pt-8 pb-12">
            <Editor
              apiKey="b0cflehrofjbs4hfxcodrxozkigdl4o2lbnvpvoi0q9r34lv"
              id="editorWork"
              onInit={(evt, editor) => (editorRef.current = editor)}
              placeholder="พิมพ์ข้อความ....."
              initialValue={intro.old != intro.new ? intro.old : ""}
              onChange={(e, editor) => {
                setIntro({ new: editor.getContent() });
              }}
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

          <div>{character.length < 1 ? <Charcreate data={id} /> : <Charupdate data={id} />}</div>
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
            onClick={handleSubmit}
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
      {/* <hr class="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>

      <div>
        {character.length < 1 ? <Charcreate data={id} /> : <Charupdate />}
      </div> */}
    </div>
  );
}

export default Storyupdate;
