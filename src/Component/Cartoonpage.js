import Navbar from "./Navbar";
import Navbarcreator from "./Navbarceartor";
import Navbarread from "./Navbarread";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Storypage from "./Storypage";

function Cartoonpage() {
  const [user, setUser] = useState({});
  const [isLoaded, setIsLoaded] = useState(true);
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const [items, setItems] = useState([]);

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
        }
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

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
  });

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const Storypage = (id) => {
    window.location = "/storypage/" + id;
  };

  return (
    <div>
      {!user.role && <Navbar />}
      {user.role === "MEMBER" && <Navbarread />}
      {user.role === "CREATOR" && <Navbarcreator />}

      <div className="w-5/12 m-auto container mx-auto  px-12 py-12 mb-32">
        <div className="border rounded-xl p-4 mb-6 flex justify-between bg-primary text-white">
          <div className="py-1 px-3 inline-flex items-center gap-x-1">
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
            <div className="text-xl font-bold ">การ์ตูน</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {items
            .filter(
              (item) => item.type === "CARTOON" && item.status === "public"
            )
            .map((row) => (
              <div key={row.id}>
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
                    src={`../img/work/` + row.picture}
                    width={75}
                    height={100}
                    onClick={() => Storypage(row.id)}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Cartoonpage;
