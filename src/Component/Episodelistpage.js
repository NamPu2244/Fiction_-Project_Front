import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbarread from "./Navbarread";
import Navbarcreator from "./Navbarceartor";
import { useParams } from "react-router-dom";

function Episodelistpage() {
  const { id } = useParams();

  const [items, setItems] = useState([]);

  const navigate = useNavigate();

  const [isLoaded, setIsLoaded] = useState(true);
  const [user, setUser] = useState([]);

  const [list, setList] = useState({});

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
  };

  useEffect(() => {
    const fetchList = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = new Headers({
          Authorization: `Bearer ${token}`,
        });

        const response = await fetch(
          `http://127.0.0.1:3500/espisodes/findByWorkId/${id}`,
          {
            method: "GET",
            headers,
          }
        );

        const result = await response.json();
        setItems(result); // Set the fetched episodes to the items state
      } catch (error) {
        console.error("Error fetching story:", error);
      }
    };

    fetchList();
  }, [id]);

  const UserDelete = (id) => {
    const token = localStorage.getItem("token");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

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
        fetch(`http://127.0.0.1:3500/espisodes/${id}`, requestOptions)
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
            window.location.reload();
          })
          .catch((error) => console.log("error", error));
      }
    });
  };

  const Createp = (id) => {
    window.location = "/eptooncreate/" + id;
  };

  const Updateep = (epId) => {
    window.location = `/epupdatetoon/${id}/` + epId;
  };

  const toEp = (epId) => {
    window.location = "/epstory/"+ id +"/"+ epId;
  }

  const createfic = () => {
    navigate("/epficcreate");
  };

  const createtoon = () => {
    navigate("/eptooncreate");
  };

  const updatefic = () => {
    navigate("/epupdatefic");
  };

  const updatetoon = () => {
    navigate("/epupdatetoon");
  };
  return (
    <div>
      {user.role === "MEMBER" && <Navbarread />}
      {user.role === "CREATOR" && <Navbarcreator />}
      <div className="w-9/12 m-auto">
        <div className=" bg-white text-sm py-4 dark:bg-gray-800 mb-8 border rounded-lg">
          <div
            class="max-w-[85rem] w-full mx-auto  flex flex-wrap basis-full items-center justify-between pe-4 ps-4"
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
              ตอนทั้งหมด
            </p>
            <div class="sm:order-3 flex items-center gap-x-2">
              <button
                onClick={() => Createp(id)}
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
                เพิ่มตอน
              </button>
            </div>
          </div>
        </div>

        <div>
          <div class="flex flex-col">
            <div class="-m-1.5 overflow-x-auto">
              <div class="p-1.5 min-w-full inline-block align-middle">
                <div class="border rounded-lg shadow overflow-hidden dark:border-gray-700 dark:shadow-gray-900">
                  <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead class="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th
                          scope="col"
                          class="w-20 px-4 py-3 text-start text-xl font-bold text-gray-500 uppercase dark:text-gray-400"
                        >
                          ตอนที่
                        </th>
                        <th
                          scope="col"
                          class="w-8/12 px-6 py-3 text-start text-xl font-bold text-gray-500 uppercase dark:text-gray-400"
                        >
                          ชื่อตอน
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-start text-xl font-bold  text-gray-500 uppercase dark:text-gray-400"
                        >
                          สถานะ
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-end text-xl font-bold text-gray-500 uppercase dark:text-gray-400"
                        >
                          แก้ไข
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-end text-xl font-bold text-gray-500 uppercase dark:text-gray-400"
                        >
                          ลบ
                        </th>
                      </tr>
                    </thead>

                    <tbody class="divide-y divide-gray-200 dark:divide-gray-700 bg-white">
                      {items.map((row, index) => (
                        <tr>
                          <td class="px-6 py-4 whitespace-nowrap text-base font-bold text-gray-800 dark:text-gray-200">
                            {index + 1}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-base font-bold text-gray-800 dark:text-gray-200">
                            <a className="cursor-pointer" onClick={() => toEp(row.id)}>{row.title}</a>
                          </td>

                          <td class="px-6 py-4 whitespace-nowrap text-base font-bold text-gray-800 dark:text-gray-200">
                            {row.status == "hidden" ? (
                              <h3 class="text-lg font-bold text-white bg-grey rounded-full py-1 px-3 inline-flex items-center gap-x-1">
                                ดราฟต์
                              </h3>
                            ) : (
                              <h3 class="text-lg font-bold text-white bg-pass rounded-full py-1 px-3 inline-flex items-center gap-x-1">
                                เผยแพร่
                              </h3>
                            )}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                            <button
                              onClick={() => Updateep(row.id)}
                              type="button"
                              class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-primary hover:text-purple-500 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
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
                            </button>
                          </td>

                          <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                            <button
                              onClick={() => UserDelete(row.id)}
                              type="button"
                              class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-danger hover:text-red-400 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
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
    </div>
  );
}

export default Episodelistpage;
