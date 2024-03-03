function Epficcreate() {
  return (
    <div>
      <div>
        <form>
          <div>
            <div>ชื่อตอน</div>
            <input type="text"></input>
          </div>

          <div>
            <div>เนื้อหา</div>
            <input type="text"></input>
          </div>

          <div>
            <p className="text-lg font-bold">เผยแพร่</p>
            <input
              type="checkbox"
              id="statusCheckbox"
              class="relative w-[3.25rem] h-7 p-px bg-gray-100 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-blue-600 disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-blue-600 checked:border-blue-600 focus:checked:border-blue-600 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-600
                          before:inline-block before:w-6 before:h-6 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-blue-200"
              //   value={status}
              //   onChange={(e) => {
              //     if (e.target.checked) {
              //       e.target.value = "public"; // Set value to 'public' when checked
              //       setStatus(e.target.value);
              //     } else {
              //       e.target.value = "hidden"; // Set value to 'public' when checked
              //       setStatus(e.target.value);
              //     }
              //     console.log(e.target.value);
              //   }}
            />
            <label for="hs-basic-usage" class="sr-only">
              เผยแพร่{" "}
            </label>
          </div>

          <div className="flex justify-around gap-7 mt-6 mb-20">
            <button
              type="button"
              className="w-full inline-flex items-center gap-x-2 mt-10 text-lg text-start shadow bg-white hover:bg-purple-400 focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-left-square"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"
                />
              </svg>
              ย้อนกลับ
            </button>
            <button
              type="submit"
              className=" w-full inline-flex items-center gap-x-2 mt-10 text-lg text-start shadow bg-violet-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-save"
                viewBox="0 0 16 16"
              >
                <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1z" />
              </svg>
              บันทึก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Epficcreate;
