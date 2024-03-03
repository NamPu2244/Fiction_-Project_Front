import "./Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const login = () => {
    navigate("/Login");
  };

  const register = () => {
    navigate("/Register");
  };

  const fiction = () => {
    navigate("/fictionpage");
  };

  const cartoon = () => {
    navigate("/cartoonpage");
  };

  const Homepage = () => {
    navigate("/");
  };

  const character = () => {
    navigate("/character");
  };
  
  return (
    <header class="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white shadow-md py-5 px-5 mb-10">
      <nav class="max-w-[85rem] w-full mx-auto px-4 flex flex-wrap basis-full items-center justify-between" aria-label="Global">
        <img src="/img/logo/fictoon_logo.jpg" width={90} height={30}></img>
          <div class="sm:order-3 flex items-center gap-x-2">
            <button type="button" class="sm:hidden hs-collapse-toggle p-2.5 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-gray-700 dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-collapse="#navbar-alignment" aria-controls="navbar-alignment" aria-label="Toggle navigation">
              <svg class="hs-collapse-open:hidden flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="18" y2="18"/></svg>
              <svg class="hs-collapse-open:block hidden flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
            <button type="button" onClick={register} class="py-2 px-3 inline-flex items-center gap-x-2 text-lg font-semibold rounded-lg border border-white bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
              สมัครสมาชิก
            </button>
            <button type="button" onClick={login} class="py-2 px-3 inline-flex items-center gap-x-2 text-lg font-semibold rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
            <svg class="w-[14px] h-[14px] text-gray-800 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 18">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M7 8a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-2 3h4a4 4 0 0 1 4 4v2H1v-2a4 4 0 0 1 4-4Z"/>
            </svg>เข้าสู่ระบบ
            </button>
          </div>
          <div id="navbar-alignment" class="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:grow-0 sm:basis-auto sm:block sm:order-2">
            <div class="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:mt-0 sm:ps-5">
              <a class="text-xl font-bold text-gray-800 hover:text-gray-400  dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#" onClick={Homepage}>หน้าหลัก</a>
              <a class="text-xl font-bold text-gray-800 hover:text-gray-400 dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#" onClick={fiction}>นวนิยาย</a>
              <a class="text-xl font-bold text-gray-800 hover:text-gray-400 dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#" onClick={cartoon}>การ์ตูน</a>
              <a class="text-xl font-bold  text-gray-800 hover:text-gray-400  dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#" onClick={character}>ตัวละคร</a>
            </div>
          </div>
      </nav>
    </header>
  );
}

export default Navbar;
