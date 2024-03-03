import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Dropdown } from "flowbite-react";

function Navbarread() {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
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
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const fiction = () => {
    navigate("/fictionpage");
  };

  const cartoon = () => {
    navigate("/cartoonpage");
  };

  const main_page = () => {
    navigate("/main_page");
  };

  const character = () => {
    navigate("/character");
  };

  return (
    <header class="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white shadow-md py-5 px-5 mb-10">
      <nav class="max-w-[85rem] w-full mx-auto px-4 flex flex-wrap basis-full items-center justify-between">
        <img src="/img/logo/fictoon_logo.jpg" width={90} height={30}></img>
        <div class="sm:order-3 flex items-center gap-x-2">
          <Dropdown
            className=""
            label=""
            dismissOnClick={false}
            renderTrigger={() => (
              <span class="cursor-pointer py-2 px-3 inline-flex items-center gap-x-2 text-lg font-semibold rounded-lg border border-white bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                {user.name}
              </span>
            )}
          >
            <Dropdown.Item onClick={logout}>
              <a
                class="flex items-center  gap-x-3.5 px-3 rounded-lg text-lg font-bold text-danger hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700"
                href="#"
              >
                <svg
                  class="w-[18px] h-[18px] text-danger dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                    d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"
                  />
                </svg>
                ออกจากระบบ
              </a>
            </Dropdown.Item>
          </Dropdown>
          <button
            type="button"
            class="py-2 px-3 inline-flex items-center gap-x-2 text-lg font-semibold rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
          >
            <svg
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              class="bi bi-piggy-bank-fill text-warning"
              viewBox="0 0 16 16"
            >
              <path d="M7.964 1.527c-2.977 0-5.571 1.704-6.32 4.125h-.55A1 1 0 0 0 .11 6.824l.254 1.46a1.5 1.5 0 0 0 1.478 1.243h.263c.3.513.688.978 1.145 1.382l-.729 2.477a.5.5 0 0 0 .48.641h2a.5.5 0 0 0 .471-.332l.482-1.351c.635.173 1.31.267 2.011.267.707 0 1.388-.095 2.028-.272l.543 1.372a.5.5 0 0 0 .465.316h2a.5.5 0 0 0 .478-.645l-.761-2.506C13.81 9.895 14.5 8.559 14.5 7.069c0-.145-.007-.29-.02-.431.261-.11.508-.266.705-.444.315.306.815.306.815-.417 0 .223-.5.223-.461-.026a.95.95 0 0 0 .09-.255.7.7 0 0 0-.202-.645.58.58 0 0 0-.707-.098.735.735 0 0 0-.375.562c-.024.243.082.48.32.654a2.112 2.112 0 0 1-.259.153c-.534-2.664-3.284-4.595-6.442-4.595Zm7.173 3.876a.565.565 0 0 1-.098.21.704.704 0 0 1-.044-.025c-.146-.09-.157-.175-.152-.223a.236.236 0 0 1 .117-.173c.049-.027.08-.021.113.012a.202.202 0 0 1 .064.199Zm-8.999-.65a.5.5 0 1 1-.276-.96A7.613 7.613 0 0 1 7.964 3.5c.763 0 1.497.11 2.18.315a.5.5 0 1 1-.287.958A6.602 6.602 0 0 0 7.964 4.5c-.64 0-1.255.09-1.826.254ZM5 6.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0" />
            </svg>
            {user.coin} COIN
          </button>
        </div>
        <div
          id="navbar-alignment"
          class="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:grow-0 sm:basis-auto sm:block sm:order-2"
        >
          <div class="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:mt-0 sm:ps-5">
            <a
              class="text-xl font-bold text-gray-800 hover:text-gray-400  dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              href="#"
              onClick={main_page}
            >
              หน้าหลัก
            </a>
            <a
              class="text-xl font-bold text-gray-800 hover:text-gray-400 dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              href="#"
              onClick={fiction}
            >
              นวนิยาย
            </a>
            <a
              class="text-xl font-bold text-gray-800 hover:text-gray-400 dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              href="#"
              onClick={cartoon}
            >
              การ์ตูน
            </a>
            <a
              class="text-xl font-bold  text-gray-800 hover:text-gray-400  dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              href="#"
              onClick={character}
            >
              ตัวละคร
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbarread;
