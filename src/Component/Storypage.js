import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbarcreator from "./Navbarceartor";
import Navbarread from "./Navbarread";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./Storypage.css";
import Navbar from "./Navbar";
import Character from "./Character/Character";

function Storypage() {
  // Accepting `id` as a prop
  const { id } = useParams();
  const { workId } = useParams();
  const [isLoaded, setIsLoaded] = useState(true);
  const [user, setUser] = useState([]);
  const [story, setStory] = useState({}); // State for story data
  const [character, setCharacter] = useState([]);
  const [episode, setEpisode] = useState([]);

  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   var myHeaders = new Headers();
  //   myHeaders.append("Authorization", "Bearer " + token);

  //   var requestOptions = {
  //     method: "GET",
  //     headers: myHeaders,
  //     redirect: "follow",
  //   };

  //   fetch("http://127.0.0.1:3500/auth/getProfile", requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       if (result.status === 200) {
  //         setUser(result.user);
  //         setIsLoaded(false);
  //       }
  //       console.log(result);
  //     })
  //     .catch((error) => console.log("error", error));

  //   fetch(http://127.0.0.1:3500/espisodes/findByWorkId/${id}, requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       setEpisode(result);
  //     })
  //     .catch((error) => console.log("error", error));
  // }, []);

  useEffect(() => {
    // alert(id);
  }, {});

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
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const [episodeCount, setEpisodeCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`http://127.0.0.1:3500/espisodes/findByWorkId/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setEpisode(result);
        console.log(episode);
      })
      .catch((error) => console.log("error", error));

    fetch(`http://127.0.0.1:3500/works/${id}`, {
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((storyData) => {
        setCharacter(storyData.characters);
      });
  }, []);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = new Headers({
          Authorization: `Bearer ${token}`,
        });

        const response = await fetch(`http://127.0.0.1:3500/works/${id}`, {
          method: "GET",
          headers,
        });

        const result = await response.json();
        console.log(result);
        setStory(result);
      } catch (error) {
        console.error("Error fetching story:", error);
        // Handle error gracefully
      }

      console.log(story);
    };

    fetchStory();
  }, [id]);

  const eps = (epId) => {
    window.location = `/epstory/${id}/` + epId;
  };

  const Eptoon = () => {
    navigate("/episodecartoon");
  };

  const [totalEpisodes, setTotalEpisodes] = useState(0);
  const [currentEpisode, setCurrentEpisode] = useState(1); // เริ่มจาก 1
  const handleEpisodeChange = (e) => {
    const newEpisode = parseInt(e.target.value);
    if (newEpisode > 0 && newEpisode <= totalEpisodes) {
      setCurrentEpisode(newEpisode);
    }
  };

  return (
    <div>
      {!user.role && <Navbar />}
      {user.role === "MEMBER" && <Navbarread />}
      {user.role === "CREATOR" && <Navbarcreator />}
      <div className="w-5/12 m-auto container mx-auto border rounded-lg bg-white px-12 py-12 mb-32">
        <div className="">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-start-1 col-end-6 justify-items-center">
              <img
                src={`../img/work/` + story.picture}
                width={224}
                height={299}
                className="border rounded-lg  mb-4 h-72 w-56"
              ></img>

              <label>
                <p className="text-xl font-bold border rounded-lg px-4 py-3 w-56 text-center">
                  {story.user?.name}
                </p>
              </label>
            </div>

            <div className="col-start-6 col-end-13">
              <label>
                <div className="mb-4">
                  <p className="text-lg font-bold">ชื่อเรื่อง</p>
                  <p className="border rounded-lg px-4 py-3 font-bold">{story.title}</p>
                </div>
              </label>

              <label>
                <div className="mb-4">
                  <p className="text-lg font-bold">คำโปรย</p>
                  <p className="border rounded-lg px-4 py-3 h-24 font-bold overflow-auto">
                    {story.tagline}
                  </p>
                </div>
              </label>

              <label>
                <div className="mb-4">
                  <p className="text-lg font-bold">หมวดหมู่</p>
                  <p className="border rounded-lg px-4 py-3 font-bold">
                    {story.category}
                  </p>
                </div>
              </label>

              <label className="grid grid-flow-col justify-stretch">
                <div className="text-lg font-bold ">ประเภท</div>
                <div className="text-lg font-bold">{story.type}</div>
              </label>
            </div>
          </div>

          <hr class="h-px mb-8 mt-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>

          <div>
            <label>
              <p className="text-2xl font-bold">แนะนำเรื่อง</p>
              <div
                className="border rounded-lg px-4 py-3.5 h-auto"
                dangerouslySetInnerHTML={{ __html: story.intro }}
              ></div>
              {/* <p className="border rounded-lg px-4 py-3.5 h-60">{story.intro}</p> */}
            </label>
          </div>
        </div>

        {character.length >= 1 ? (
          <div className="">
            <hr class="h-px mb-8 mt-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            <Character data={id} />
          </div>
        ) : null}

        <hr class="h-px mb-8 mt-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <div>
          <div className="text-2xl font-bold">ตอนทั้งหมด</div>

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
                            class="px-4 py-3 text-start w-20 text-xl font-bold text-gray-500 uppercase dark:text-gray-400"
                          >
                            ตอนที่
                          </th>

                          <th
                            scope="col"
                            class="px-6 py-3 text-start text-xl font-bold text-gray-500 uppercase dark:text-gray-400"
                          >
                            ชืื่อตอน
                          </th>
                        </tr>
                      </thead>

                      <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                        {episode
                          .filter((item) => item.status === "public")
                          .map((ep, index) => (
                            <tr>
                              <td
                                onClick={() => eps(ep.id)}
                                class="cursor-pointer px-6 py-4 whitespace-nowrap text-base  font-medium text-gray-800 dark:text-gray-200"
                                value={currentEpisode}
                                onChange={handleEpisodeChange}
                              >
                                {index + 1}
                              </td>

                              <td
                                onClick={() => eps(ep.id)}
                                class="cursor-pointer px-6 py-4 whitespace-nowrap text-base font-medium text-gray-800 dark:text-gray-200"
                              >
                                {ep.title}
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
    </div>
  );
}

export default Storypage;
