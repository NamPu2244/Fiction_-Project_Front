import Navbar from "./Navbar";
import Navbarcreator from "./Navbarceartor";
import Navbarread from "./Navbarread";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Storypage from "./Storypage";

function Fictionpage() {
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
        }
        // console.log(result);
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
        // console.log(result)  ;
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

      <div className="w-5/12 m-auto container mx-auto px-12 py-12 mb-32">
        <div className="border rounded-xl p-4 mb-6 flex justify-between bg-primary text-white">
          <div className="py-1 px-3 inline-flex items-center gap-x-1">
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
            <div className="text-xl font-bold ">นวนิยาย</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {items
            .filter(
              (item) => item.type === "FICTION" && item.status === "public"
            )
            .map((row) => (
              <div key={row.id}>
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

export default Fictionpage;
