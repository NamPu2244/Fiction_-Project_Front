import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbarread from "./Navbarread";
import Navbarcreator from "./Navbarceartor";
import Storypage from "./Storypage";

function Workpage() {
  const [items, setItems] = useState([]);

  const navigate = useNavigate();

  const [isLoaded, setIsLoaded] = useState(true);
  const [user, setUser] = useState([]);

  useEffect(() => {
    UserGet();
  }, []);

  const UserGet = () => {
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

    fetch("http://127.0.0.1:3500/works/findAllByUser", requestOptions)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setItems(result);
      });
  };


  

  const UserUpdate = (id) => {
    window.location = "/storyupdate/" + id;
  };

  // const UserList = (id) => {
  //   window.location = "/listpage/" + id;
  // };

  // const logout = () => {
  //   localStorage.removeItem("token");
  //   navigate("/");
  // };

  // const listpage = () => {
  //   navigate("/listpage");
  // };

  const UserDelete = (id) => {
    const token = localStorage.getItem("token");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var raw = "";

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    // Add a conditional statement before sending the DELETE request
    Swal.fire({
      title: "ยืนยันการลบข้อมูลหรือไม่",
      text: "หากคุณยืนยัน ข้อมูลทั้งถูกจะถูกลบ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "ลบ",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      // Proceed with deletion only if confirmed
      if (result.isConfirmed) {
        fetch(`http://127.0.0.1:3500/works/${id}`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            if (result.status === 200) {
              Swal.fire({
                title: "ลบข้อมูลเสร็จสิ้น!",
                text: "ผลงานถูกลบเรียบร้อย",
                icon: "success",
              });
              UserGet();
            }
          })
          .catch((error) => console.log("error", error));
      }
    });
  };

  const Storypage = (id) => {
    window.location = "/storypage/" + id;
  };

  const Listpage = (id) => {
    window.location = "/listpage/" + id;
  };


  const create = () => {
    navigate("/createpage");
  };

  

  return (
    <div>
      {user.role === "MEMBER" && <Navbarread />}
      {user.role === "CREATOR" && <Navbarcreator />}
      <div className="w-9/12 m-auto mb-8">
        <div class="flex flex-wrap sm:justify-start sm:flex-nowrap  bg-white text-sm py-4 dark:bg-gray-800 mb-8 border rounded-lg">
          <div
            class="max-w-[85rem] w-full mx-auto  flex flex-wrap basis-full items-center justify-between ps-4 pe-4"
            aria-label="Global"
          >
            <p class="sm:order-1 inline-flex items-center gap-x-2 flex-none text-xl font-semibold dark:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-file-richtext"
                viewBox="0 0 16 16"
              >
                <path d="M7 4.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0m-.861 1.542 1.33.886 1.854-1.855a.25.25 0 0 1 .289-.047l1.888.974V7.5a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V7s1.54-1.274 1.639-1.208M5 9a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1z" />
                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1" />
              </svg>
              ผลงานทั้งหมด
            </p>
            <div class="sm:order-3 flex items-center gap-x-2">
              <button
                onClick={create}
                type="button"
                class="py-2 px-3 inline-flex items-center gap-x-2 text-lg font-bold rounded-lg border border-gray-200 bg-pass text-white shadow-sm hover:bg-teal-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-pencil-square"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path
                    fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                  />
                </svg>
                เพิ่มผลงาน
              </button>
            </div>
          </div>
        </div>

        <div class="flex flex-col ">
          <div class="-m-1.5 overflow-x-auto">
            <div class="p-1.5 min-w-full inline-block align-middle">
              <div class="border rounded-lg overflow-hidden dark:border-gray-700">
                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        class="px-6 py-3 text-start text-xl font-bold text-gray-500 uppercase"
                      >
                        รูปภาพ
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-start text-xl font-bold text-gray-500 uppercase"
                      >
                        ชื่อเรื่อง
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase"
                      >
                        ประเภท
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase"
                      >
                        สถานะ
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase"
                      >
                        ตอน
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase"
                      >
                        แก้ไขรายละเอียด
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase"
                      >
                        ลบผลงาน
                      </th>
                    </tr>
                  </thead>

                  <tbody class="divide-y divide-gray-200 dark:divide-gray-700 bg-white">
                    {items.map((row) => (
                      <tr>
                        <td class="px-6 py-4 whitespace-nowrap text-gray-800 dark:text-gray-200">
                          <img
                            className="w-20 h-24 rounded-xl cursor-pointer"
                            onClick={() => Storypage(row.id)}
                            src={`../img/work/` + row.picture}
                            width={75}
                            height={100}
                          ></img>
                        </td>

                        <td class="px-6 py-4 whitespace-nowrap text-2xl font-bold text-gray-800 dark:text-gray-200">
                          {row.title}
                        </td>

                        <td class="px-6 py-4 whitespace-nowrap text-center text-gray-800 dark:text-gray-200">
                          <div class="px-6 py-3">
                            {row.type == "CARTOON" ? (
                              <span class="py-1 px-2 inline-flex items-center gap-x-1 text-base font-bold w-25 text-white bg-sec rounded-full dark:bg-teal-500/10 dark:text-teal-500">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  class="bi bi-file-image"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M8.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                                  <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8l-2.083-2.083a.5.5 0 0 0-.76.063L8 11 5.835 9.7a.5.5 0 0 0-.611.076L3 12z" />
                                </svg>
                                การ์ตูน
                              </span>
                            ) : (
                              <span class="py-1 px-2 inline-flex items-center gap-x-1 text-base font-bold w-25 bg-info text-white rounded-full dark:bg-teal-500/10 dark:text-teal-500">
                                <svg
                                  width="17"
                                  height="16"
                                  viewBox="0 0 17 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M5.5 4C5.36739 4 5.24021 4.05268 5.14645 4.14645C5.05268 4.24021 5 4.36739 5 4.5C5 4.63261 5.05268 4.75979 5.14645 4.85355C5.24021 4.94732 5.36739 5 5.5 5H11.5C11.6326 5 11.7598 4.94732 11.8536 4.85355C11.9473 4.75979 12 4.63261 12 4.5C12 4.36739 11.9473 4.24021 11.8536 4.14645C11.7598 4.05268 11.6326 4 11.5 4H5.5ZM5 6.5C5 6.36739 5.05268 6.24021 5.14645 6.14645C5.24021 6.05268 5.36739 6 5.5 6H11.5C11.6326 6 11.7598 6.05268 11.8536 6.14645C11.9473 6.24021 12 6.36739 12 6.5C12 6.63261 11.9473 6.75979 11.8536 6.85355C11.7598 6.94732 11.6326 7 11.5 7H5.5C5.36739 7 5.24021 6.94732 5.14645 6.85355C5.05268 6.75979 5 6.63261 5 6.5ZM5.5 8C5.36739 8 5.24021 8.05268 5.14645 8.14645C5.05268 8.24021 5 8.36739 5 8.5C5 8.63261 5.05268 8.75979 5.14645 8.85355C5.24021 8.94732 5.36739 9 5.5 9H11.5C11.6326 9 11.7598 8.94732 11.8536 8.85355C11.9473 8.75979 12 8.63261 12 8.5C12 8.36739 11.9473 8.24021 11.8536 8.14645C11.7598 8.05268 11.6326 8 11.5 8H5.5ZM5.5 10C5.36739 10 5.24021 10.0527 5.14645 10.1464C5.05268 10.2402 5 10.3674 5 10.5C5 10.6326 5.05268 10.7598 5.14645 10.8536C5.24021 10.9473 5.36739 11 5.5 11H8.5C8.63261 11 8.75979 10.9473 8.85355 10.8536C8.94732 10.7598 9 10.6326 9 10.5C9 10.3674 8.94732 10.2402 8.85355 10.1464C8.75979 10.0527 8.63261 10 8.5 10H5.5Z"
                                    fill="white"
                                  />
                                  <path
                                    d="M2.5 2C2.5 1.46957 2.71071 0.960859 3.08579 0.585786C3.46086 0.210714 3.96957 0 4.5 0L12.5 0C13.0304 0 13.5391 0.210714 13.9142 0.585786C14.2893 0.960859 14.5 1.46957 14.5 2V14C14.5 14.5304 14.2893 15.0391 13.9142 15.4142C13.5391 15.7893 13.0304 16 12.5 16H4.5C3.96957 16 3.46086 15.7893 3.08579 15.4142C2.71071 15.0391 2.5 14.5304 2.5 14V2ZM12.5 1H4.5C4.23478 1 3.98043 1.10536 3.79289 1.29289C3.60536 1.48043 3.5 1.73478 3.5 2V14C3.5 14.2652 3.60536 14.5196 3.79289 14.7071C3.98043 14.8946 4.23478 15 4.5 15H12.5C12.7652 15 13.0196 14.8946 13.2071 14.7071C13.3946 14.5196 13.5 14.2652 13.5 14V2C13.5 1.73478 13.3946 1.48043 13.2071 1.29289C13.0196 1.10536 12.7652 1 12.5 1Z"
                                    fill="white"
                                  />
                                </svg>

                                นวนิยาย
                              </span>
                            )}
                          </div>
                        </td>

                        <td class="px-6 py-4 whitespace-nowrap text-center  text-gray-800 dark:text-gray-200">
                          <div class="px-6 py-3">
                            {row.status == "hidden" ? (
                              <h3 class="text-lg font-bold text-white bg-grey rounded-full py-1 px-3 inline-flex items-center gap-x-1">
                                ดราฟต์
                              </h3>
                            ) : (
                              <h3 class="text-lg font-bold text-white bg-pass rounded-full py-1 px-3 inline-flex items-center gap-x-1">
                                เผยแพร่
                              </h3>
                            )}
                          </div>
                        </td>

                        <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                          <button
                            type="button"
                            onClick={() => Listpage(row.id)}
                            class="w-24 py-3 px-4 inline-box items-center gap-x-2 text-lg font-bold rounded-lg border border-transparent bg-pass text-white hover:bg-green-400 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                          >
                            รายการ
                          </button>
                        </td>

                        <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                          <button
                            onClick={() => UserUpdate(row.id)}
                            type="button"
                            class="w-24 py-3 px-4 inline-flex items-center gap-x-2 text-lg font-bold rounded-lg border border-gray-200 bg-warning text-white shadow-sm hover:bg-yellow-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-pen"
                              viewBox="0 0 16 16"
                            >
                              <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
                            </svg>
                            แก้ไข
                          </button>
                        </td>

                        <td class="px-6 py-4 whitespace-nowrap  text-center text-sm font-medium">
                          <button
                            onClick={() => UserDelete(row.id)}
                            type="button"
                            class="w-24 py-3 px-4 inline-flex items-center gap-x-2 text-lg font-bold rounded-lg border border-gray-200 bg-danger text-white shadow-sm hover:bg-red-400 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
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
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Workpage;
