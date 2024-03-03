import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Charupdate(id) {
  const navigate = useNavigate();
  const [characterId, setCharacterId] = useState();
  const [file, setFile] = useState({ preview: "", data: "" });
  const [roleAs, setRoleAs] = useState("");
  const [name, setName] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    fetch(`http://127.0.0.1:3500/works/${id.data}`, {
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((storyData) => {
        storyData.characters.map((item) => {
          setCharacterId(item.id);
          setFile({ data: item.picture });
          setName(item.name);
          setRoleAs(item.roleAs);
        });
        // console.log(storyData);
        // setFile({ data: storyData.picture });
      })
      .catch((error) => console.log("error", error));
  }, [id]);

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
    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`http://127.0.0.1:3500/characters/${characterId}`, requestOptions)
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

  const deleteCharacter = () => {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };
    console.log(characterId);
    fetch(`http://127.0.0.1:3500/characters/${characterId}`, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="my-12">
      <div>
        <div className="grid grid-cols-12">
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
                  value={name}
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
                  value={roleAs}
                  onChange={(e) => setRoleAs(e.target.value)}
                >
                  {/* <option>เลือกหมวดหมู่</option> */}
                  <option value="Hero">พระเอก</option>
                  <option value="Heroine">นางเอก</option>
                  <option value="Villain">ตัวร้าย</option>
                  <option value="Main">ตัวละครหลัก</option>
                </select>
              </label>
            </div>

            <div className="mt-8">
              <div className="grid grid-cols-2">
                <div className="grid grid-cols-2 gap-4 ">
                  <button
                    className="w-full inline-flex items-center gap-x-2 mt-10 text-lg text-start shadow bg-violet-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
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
                  <button
                    className="w-full inline-flex items-center gap-x-2 mt-10 text-lg text-start shadow bg-danger hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    onClick={deleteCharacter}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-trash3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                    </svg>
                    ลบ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Charupdate;
