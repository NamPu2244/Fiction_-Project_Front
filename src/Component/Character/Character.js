import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Character(id) {
  const MySwal = withReactContent(Swal);
  const [characterId, setCharacterId] = useState();
  const [file, setFile] = useState({ preview: "", data: "" });
  const [roleAs, setRoleAs] = useState();
  const [name, setName] = useState();
  const [title, setTitle] = useState();

  const [char, setChar] = useState();

  const navigate = useNavigate();



  const [type, setType] = useState("");

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
        setChar(storyData.characters.map((item) => {
          setCharacterId(item.id);
          setFile({ data: item.picture });
          setName(item.name);
          setRoleAs(item.roleAs);

          
        }))
        setTitle(storyData.title);
        setType(storyData.type);

        
      })

      .catch((error) => console.log("error", error));


    console.log(name);
    console.log(file);
  }, [id]);

  

  const donate = (id) => {
    Swal.fire({
      title: "สนับสนุนตัวละครนี้",
      text: "กรอกจำนวนเหรียญด้านล่าง",
      icon: "warning",
      input: "number",
      showCancelButton: true,
      confirmButtonText: "สนับสนุน",
      confirmButtonColor: "#6F5EE0",
      showLoaderOnConfirm: true,
      cancelButtonText: "ยกเลิก",
      preConfirm: async (i) => {
        if (i) {
          const token = localStorage.getItem("token");
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Authorization", "Bearer " + token);

          var raw = JSON.stringify({
            coin: i,
            characterId: id,
          });

          var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };

          fetch("http://127.0.0.1:3500/users/donate", requestOptions)
            .then((response) => response.json())
            .then((result) => {
              console.log(result)
              if (result.massage === "ไม่สามารถสนับสนุนตัวละครของตัวเองได้") {
                Swal.fire({
                  text: "ไม่สามารถสนับสนุนตัวละครของตัวเองได้",
                  icon: "error",
                });
              }

              if (result.massage === "กรุณาตรวจสอบยอดเงินของคุณ") {
                Swal.fire({
                  text: "เหรียญไม่เพียงพอ กรุณาตรวจสอบเหรียญในกระเป๋าของคุณ",
                  icon: "error",
                });
              }

              if (result.statusCode === 200) {
                Swal.fire({
                  text: "สนับสนุนเสร็จสิ้น",
                  icon: "success",
                });
              }

              if (result.statusCode === 401) {
                Swal.fire({
                  text: "กรุณาเข้าสู่ระบบก่อนที่จะสนับสนุน",
                  icon: "error",
                }).then((value) => {
                  navigate("/login");
                });;
              }
            })
            .catch((error) => console.log("error", error));
        } else {
          Swal.showValidationMessage("กรุณากรอกข้อมูลให้ครบ");
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  const thaiRole = {
    Hero: "พระเอก",
    Heroine: "นางเอก",
    Villain: "ตัวร้าย",
    Main: "ตัวละครหลัก",
  };

  const thaiRoleName = thaiRole[roleAs];

  console.log(file)
  return (
    <div>

      <div className="grid grid-cols-3 gap-4">
        <div className="border rounded-lg pt-3 pb-6 px-5 shadow-sm bg-white">
          <div className="flex justify-between text-center font-bold">
            <div>
              <p className="text-2xl">{thaiRoleName}</p>
            </div>

            <div>
              {type == "CARTOON" ? (
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
          </div>

          <div className="flex justify-center py-3">
            <img
              src={`../img/work/` + file.data}
              className="w-44 h-48 border rounded-lg"
            ></img>
          </div>

          <div className="font-bold">
            <div className="text-center">
              <p className="text-3xl">{name}</p>
              <p className="text-lg mb-2">เรื่อง {title}</p>
              <p
                onClick={() => donate(characterId)}
                className="text-lg text-warning border border-warning hover:bg-warning hover:text-white rounded-xl w-full py-0.5 px-6 cursor-pointer"
              >
                สนับสนุน
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Character;
