import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbarcreator from "./Navbarceartor";
import Navbarread from "./Navbarread";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./Storypage.css";
import Navbar from "./Navbar";

function Epstory() {
  const [isLoaded, setIsLoaded] = useState(true);
  const [user, setUser] = useState([]);
  const [items, setItems] = useState([]);

  const { id, work } = useParams();
  const [episode, setEpisode] = useState([]);

  const [works, setWorks] = useState();
  const [espisodes, setEspisodes] = useState([]);
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const [images, setImages] = useState({ data: [], file: [] });

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
        }
      })
      .catch((error) => console.log("error", error));
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

    fetch(`http://127.0.0.1:3500/espisodes/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setEpisode(result);
        if (result.pictures.length > 0) {
          const data = result.pictures.map((item) => {
            return item.picture;
          });
          setImages({
            data: data,
          });
        }
      })
      .catch((error) => console.log("error", error));

    fetch(`http://127.0.0.1:3500/works/${work}`, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        setWorks(result);
      });

    fetch(
      `http://127.0.0.1:3500/espisodes/findByWorkId/${work}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const data = result.map((item) => {
          if (item.status === "public") {
            return item;
          }
        });
        const ep = data.filter((i) => {
          return i !== undefined;
        });

        setEspisodes(ep);
      })
      .catch((error) => console.log("error", error));
  }, [id]);

  const previous = () => {
    const foundIndex = espisodes.findIndex((item) => item.id == id);

    if (espisodes[foundIndex - 1]) {
      window.location = `/epstory/${work}/` + espisodes[foundIndex - 1].id;
    } else {
      Swal.fire({
        text: "ไม่มีตอนก่อนหน้า",
        icon: "error",
      });
    }

    console.log(espisodes);
  };

  const next = () => {
    const foundIndex = espisodes.findIndex((item) => item.id == id);
    if (espisodes[foundIndex + 1]) {
      window.location = `/epstory/${work}/` + espisodes[foundIndex + 1].id;
    } else {
      Swal.fire({
        text: "ยังไม่มีตอนอัพเดตใหม่ในตอนนี้",
        icon: "error",
      });
    }
  };
  return (
    <div>
      {!user.role && <Navbar />}
      {user.role === "MEMBER" && <Navbarread />}
      {user.role === "CREATOR" && <Navbarcreator />}
      <div className="w-5/12 m-auto container mx-auto border rounded-lg bg-white px-12 py-12 mb-32">
        <div>
          <div>
            <p className="text-2xl font-bold">ชื่อตอน</p>
            <p className="border rounded-lg py-3.5 px-4 text-base font-bold mb-8">
              {episode.title}
            </p>
          </div>

          {works?.type === "FICTION" && (
            <div className="py-3.5 px-4 min-h-96 max-h-max">
              <div
                className="py-3.5 px-4 min-h-96 max-h-max"
                dangerouslySetInnerHTML={{ __html: episode.contentText }}
              ></div>
            </div>
          )}

          {works?.type === "CARTOON" && (
            <div className="container mt-12">
              {images.data.map((item, index) => (
                <div className="image " key={index}>
                  <img className="mx-auto" src={`../../img/work/` + item}></img>
                </div>
              ))}
            </div>
          )}
        </div>

        <hr class="h-px mb-8 mt-12 bg-gray-200 border-0 dark:bg-gray-700"></hr>

        <div className="flex justify-between ">
          {espisodes.findIndex((item) => item.id == id) !== 0 ? (
            <button
              className="w-28 inline-flex justify-center items-center gap-x-2 mt-10 text-lg text-start shadow bg-violet-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded-full"
              onClick={previous}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-chevron-left"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                />
              </svg>
              ก่อนหน้า
            </button>
          ) : (
            <button
              className="w-28 inline-flex items-center gap-x-2 mt-10 text-lg text-start shadow bg-violet-200 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded-full"
              onClick={previous}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-chevron-left"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                />
              </svg>
              ก่อนหน้า
            </button>
          )}

          <button
            className="w-28 inline-flex justify-center items-center gap-x-2 mt-10 text-lg text-start shadow bg-violet-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded-full"
            onClick={next}
          >
            ถัดไป
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-chevron-right"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Epstory;
