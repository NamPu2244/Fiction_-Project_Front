// import "./Eptooncreate.css";
import React, { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import Navbarread from "./Navbarread";
import Navbarcreator from "./Navbarceartor";
import { useParams } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { createElement } from "react";

import FormData from "form-data";

function Epupdatetoon() {
  const { id, work } = useParams();
  const navigate = useNavigate();
  // const [intro, setIntro] = useState("");
  const [list, setList] = useState({});
  const MySwal = withReactContent(Swal);
  const [isLoaded, setIsLoaded] = useState(true);
  const [user, setUser] = useState([]);
  const [type, setType] = useState([]);
  const [images, setImages] = useState({ data: [] });
  const [updateImages, setUpdateImages] = useState([]);
  const [isDragging, setisDragging] = useState(false);
  const fileInputRef = useRef(null);
  const [title, setTitle] = useState("");
  const [files, setFiles] = useState([]);

  // const [contenttext, setContenttext] = useState("");
  const [contenttext, setContenttext] = useState({ old: "", new: "" });
  const [status, setStatus] = useState("");
  const [works, setWorks] = useState();
  const [items, setItems] = useState([]);
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

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

    fetch(`http://127.0.0.1:3500/works/${work}`, requestOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          setWorks(result);
          // console.log(works)
        },
        [work]
      );

    fetch(`http://127.0.0.1:3500/espisodes/${id}`, requestOptions)
      .then((res) => res.json())
      .then((items) => {
        setItems(items);
        setTitle(items.title);
        setContenttext({ old: items.contentText });
        setStatus(items.status);
        // console.log(items.pictures.length > 0);
        if (items.pictures.length > 0) {
          const data = items.pictures.map((item) => {
            return { name: item.picture, id: item.id };
          });

          // console.log(dataa);
          setImages({
            data: data,
          });

          console.log(images);
        }
        // if (items.pictures.length > 0) {
        //   for (let i = 0; i < items.pictures.length; i++) {
        //     console.log(items.pictures[i])
        // setImages([
        //   {
        //     name: items.pictures[i],
        //   },
        // ]);
        //   }
        //   console.log(images);
        // }
      });
  }, [id]);

  const statusCheck = document.getElementById("statusCheckbox");
  if (statusCheck) {
    if (status === "public") {
      statusCheck.checked = true;
    }
  }

  const handleChange = (event) => {
    const files = event.target.files;
    setFiles(files);
  };

  const customFile = (e) => {
    console.log(e);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    // formdata.append("workId", id);
    formdata.append("title", title);
    formdata.append("status", status);
    // formdata.append("contentText", contenttext);

    if (contenttext.new) {
      formdata.append("contentText", contenttext.new);
    } else {
      formdata.append("contentText", contenttext.old);
    }
    let i = 0;
    const data = images.data.map((item) => {
      if (item.url) {
        formdata.append(`pictures[${i}][image]`, item.file);
        if (item.id) {
          formdata.append(`pictures[${i}][id]`, item.id);
        }
        i = i + 1;
        return item;
      }
    });

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`http://127.0.0.1:3500/espisodes/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.statusCode === 200) {
          Swal.fire({
            text: "แก้ไขเสร็จสิ้น",
            icon: "success",
          }).then((value) => {
            navigate("/listpage/" + work);
          });
        }
      })
      .catch((error) => console.log("error", error));
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // function updateImg(e, index) {
  //   const files = e.target.files[0];
  //   const update = images.data.map((item, i) => {
  //     if (i === index) {
  //       const data = {
  //         ...item,
  //         file: files,
  //         url: URL.createObjectURL(files),
  //       };
  //       return data;
  //     } else {
  //       // The rest haven't changed
  //       return item;
  //     }
  //   });

  //   console.log(update);
  //   setImages({ data: update });
  // }

  function updateImg(e, index) {
    const files = e.target.files[0];
    const update = images.data.map((item, i) => {
      if (i === index) {
        const data = {
          ...item,
          file: files,
          url: URL.createObjectURL(files),
        };

        console.log(data);
        return data;
      } else {
        // The rest haven't changed
        return item;
      }
    });

    console.log(update);
    setImages({ data: update });
  }

  function deleteImage(index, id) {
    images.data.splice(index, 1);
    setImages({ data: images.data });

    if (id) {
      var requestOptions = {
        method: "DELETE",
        redirect: "follow",
      };

      fetch(`http://127.0.0.1:3500/espisodes/deletePic/${id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    }
  }

  function deleteUpdateImage(index) {
    updateImages.splice(index, 1);
    console.log(updateImages.splice(index, 1));
    setUpdateImages([...updateImages]);
  }

  const handleClick = (e) => {
    const files = e.target.files[0];
    // images.data.push({ file: files, url: URL.createObjectURL(files) });
    // console.log(files.name);
    // const update = images.data.map((item) => {
    //   if(!item.file & item.file !== files){
    //     console.log({file: files, url: URL.createObjectURL(files)})
    //   }
    // });
    // console.log(update);
    setImages({
      data: [...images.data, { file: files, url: URL.createObjectURL(files) }],
    });
    // console.log(updateImages);
    console.log(images.data);
  };

  const Backto = () => {
    // ตรวจสอบว่าแต่ละฟิลด์มีค่าหรือไม่
    const hasTitle = title !== "";
    const hasStatus = status !== "";

    // ถ้ามีฟิลด์ใด ๆ มีค่า ให้ขึ้น swal
    if (hasTitle || hasStatus) {
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
          navigate("/main_page/");
        }
      });
    }
  };

  return (
    <div>
      {user.role === "MEMBER" && <Navbarread />}
      {user.role === "CREATOR" && <Navbarcreator />}
      <div>
        <form
          className="w-6/12 m-auto container mx-auto  "
          onSubmit={handleSubmit}
        >
          <div className="border rounded-lg bg-white px-12 py-12">
            <div>
              <div className="block text-xl font-bold mb-2 ">ชื่อตอน</div>
              <input
                className="w-full rounded-lg border-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                value={title}
                type="text"
                placeholder="title"
                onChange={(e) => setTitle(e.target.value)}
              ></input>
            </div>

            <div className="mt-16 mb-8 border">
              {works?.type === "CARTOON" && (
                <div className="container">
                  {/* <input type="file" name="file" onChange={handleClick} /> */}
                  <div className="flex ms-6 mb-6">
                    <label
                      for="file"
                      class="bg-white border py-3.5 px-4 mt-5 w-56 text-center font-bold rounded-lg cursor-pointer"
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
                      className="hidden "
                      type="file"
                      id="file"
                      name="file"
                      onChange={handleClick}
                    />
                  </div>
                  <hr class="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>

                  <div className="flex overflow-x-auto gap-4 px-11 pt-7">
                    {images.data
                      ? images.data.map((item, index) => (
                          <div className="new-img" key={index}>
                            <div>
                              <span
                                className="bg-white rounded-xl mt-3 flex justify-center mb-3 text-danger "
                                onClick={() => deleteImage(index, item?.id)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  class="bi bi-trash3-fill"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                </svg>
                              </span>
                              <label
                                for={`file-upload-${index}`}
                                class="w-56 h-72 rounded-xl cursor-pointer "
                              >
                                <img
                                  className="w-56 h-72 rounded-xl"
                                  src={
                                    item.file
                                      ? item.url
                                      : `../../img/work/` + item.name
                                  }
                                />
                              </label>
                              <input
                                className="invisible "
                                type="file"
                                id={`file-upload-${index}`}
                                name="file"
                                onChange={(e) => updateImg(e, index)}
                              />
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                </div>
              )}
            </div>

            <div className="text-xl font-bold">
              {works?.type === "FICTION" && (
                <div className="flex justify-center pt-8 pb-12">
                  <Editor
                    apiKey="b0cflehrofjbs4hfxcodrxozkigdl4o2lbnvpvoi0q9r34lv"
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    // initialValue={contenttext}
                    initialValue={
                      contenttext.old != contenttext.new ? contenttext.old : ""
                    }
                    placeholder="พิมพ์ข้อความ....."
                    // onChange={(e) => setContenttext(e.level.content)}

                    onChange={(e, editor) => {
                      setContenttext({ new: editor.getContent() });
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
              )}
            </div>

            <div className="flex justify-between gap-7 ">
              <div>
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
                  }}
                />
                <label for="hs-basic-usage" class="sr-only">
                  เผยแพร่{" "}
                </label>
              </div>

              <div className="flex justify-between gap-7">
                <button
                  onClick={Backto}
                  type="button"
                  className="w-28 h-11 inline-flex items-center gap-x-2  text-lg text-start shadow bg-white hover:bg-purple-400 focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded"
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
                  className=" w-28 h-11 inline-flex items-center gap-x-2 text-lg text-start shadow bg-violet-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
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
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Epupdatetoon;
