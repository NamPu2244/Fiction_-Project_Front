import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Charactermain from "./Character/Charactermain";

function Homepage() {
  const [user, setUser] = useState({});
  const [isLoaded, setIsLoaded] = useState(true);
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const [items, setItems] = useState([]);
  const perPage = 6;

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://127.0.0.1:3500/works", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setItems(result);
      });
  }, []);

  const login = () => {
    navigate("/login");
  };

  const register = () => {
    navigate("/Register");
  };

  const Storypage = (id) => {
    window.location = "/storypage/" + id;
  };

  const ficpage = () => {
    navigate("/fictionpage");
  };

  const carpage = () => {
    navigate("/cartoonpage");
  };

  const character = () => {
    navigate("/character");
  };

  return (
    <div>
      <Navbar />

      <div className="w-5/12 m-auto container mx-auto px-12 py-12 mb-32">
        <div>
          <div className="border rounded-xl p-4 mb-6 flex justify-between bg-white">
            <div className="py-1 px-3 inline-flex items-center gap-x-1">
              <div className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-file-text"
                  viewBox="0 0 16 16"
                >
                  <path d="M5 4a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5M5 8a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1z" />
                  <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1" />
                </svg>
              </div>
              <div className="item-center text-xl font-bold">นวนิยาย</div>
            </div>
            <div>
              <a className="text-xl font-bold cursor-pointer" onClick={ficpage}>
                ดูทั้งหมด
              </a>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-12">
            {items
              .filter(
                (item) => item.type === "FICTION" && item.status === "public"
              )
              .slice(0, 6)
              .map((fiction) => (
                <div key={fiction.id}>
                  <div class="relative  border shadow-sm rounded-xl  dark:border-gray-700 dark:shadow-slate-700/[.7]">
                    <div class="absolute top-0 start-0 end-0">
                      <div class="p-4 md:p-5">
                        <h3 class="text-lg font-bold text-white bg-info rounded-full py-1 px-3 inline-flex items-center gap-x-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-file-text"
                            viewBox="0 0 16 16"
                          >
                            <path d="M5 4a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5M5 8a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1z" />
                            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1" />
                          </svg>
                          นวนิยาย
                        </h3>
                      </div>
                    </div>
                    <img
                      className="rounded-xl h-72 w-56 cursor-pointer"
                      src={`../img/work/` + fiction.picture}
                      width={224}
                      height={299}
                      onClick={() => Storypage(fiction.id)}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div>
          <div className="border rounded-xl p-4  mb-6 flex justify-between bg-white">
            <div className="py-1 px-3 inline-flex items-center gap-x-1">
              <div className="">
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
              </div>
              <div className="item-center text-xl font-bold">การ์ตูน</div>
            </div>
            <div>
              <a className="text-xl font-bold cursor-pointer" onClick={carpage}>
                ดูทั้งหมด
              </a>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-12">
            {items
              .filter(
                (item) => item.type === "CARTOON" && item.status === "public"
              )
              .slice(0, 6)
              .map((cartoon) => (
                <div key={cartoon.id}>
                  <div class="relative  border shadow-sm rounded-xl  dark:border-gray-700 dark:shadow-slate-700/[.7]">
                    <div class="absolute top-0 start-0 end-0">
                      <div class="p-4 md:p-5">
                        <h3 class="text-lg font-bold text-white bg-sec rounded-full py-1 px-3 inline-flex items-center gap-x-1">
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
                        </h3>
                      </div>
                    </div>
                    <img
                      className="rounded-xl h-72 w-56 cursor-pointer"
                      src={`../img/work/` + cartoon.picture}
                      width={224}
                      height={299}
                      onClick={() => Storypage(cartoon.id)}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div>
          <div className="border rounded-xl p-4  mb-6 flex justify-between bg-white">
            <div className="py-1 px-3 inline-flex items-center gap-x-1">
              <div className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-file-person"
                  viewBox="0 0 16 16"
                >
                  <path d="M12 1a1 1 0 0 1 1 1v10.755S12 11 8 11s-5 1.755-5 1.755V2a1 1 0 0 1 1-1zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                  <path d="M8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                </svg>
              </div>
              <div className="item-center text-xl font-bold">ตัวละคร</div>
            </div>
            <div>
              <a
                className="text-xl font-bold cursor-pointer"
                onClick={character}
              >
                ดูทั้งหมด
              </a>
            </div>
          </div>

          <Charactermain data={perPage} />
        </div>
      </div>
    </div>
  );
}

export default Homepage;
