import { useContext, useEffect, useState } from "react";
import React from "react";
import Link from "next/link";
// import { sidebarData } from "pages/1.0.x/sidebar";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// export default function Sidebar(props: any) {
//   console.log(props, "PPP");
//   const { sidebar } = props;
//   return (
//     // @ts-ignore

//     <aside className="w-64" aria-label="Sidebar">
//       <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">
//         <ul className="space-y-2">
//           <li>
//             <a
//               href="#"
//               className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
//             >
//               <span className="ml-3">Dashboard</span>
//             </a>
//           </li>
//         </ul>
//         <ul className="pt-4 mt-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
//           <li>
//             <a
//               href="#"
//               className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
//             >
//               <span className="ml-4">Upgrade to Pro</span>
//             </a>
//           </li>
//         </ul>
//       </div>
//     </aside>
//   );
// }

export default function Sidebar(props: any) {
  // const sidebarData = await getSidebarJson(props.version);
  // console.log(sidebarData, "SIDEBAR");
  const baseDirPath = process.cwd();
  // useEffect(() => {
  //   // React advises to declare the async function directly inside useEffect
  //   async function getSidebarJson() {
  //     const data = await import(
  //       baseDirPath + `pages/${props.version}/sidebar.json`
  //     );
  //     console.log(data);
  //   }

  //   // You need to restrict it at some point
  //   // This is just dummy code and should be replaced by actual

  //   getSidebarJson();
  // }, []);

  const [collapseShow, setCollapseShow] = React.useState("hidden");
  return (
    <Suspense fallback={`Loading...`}>
      <nav className="md:left-0 fixed md:h-full md:overflow-y-auto md:flex-row md:flex-nowrap shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-80 z-10 ">
        <div className="md:flex-col md:items-stretch overflow-hidden md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-red-300 rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars">knkn</i>
          </button>
          <div className="pt-4">
            {props.sidebar.map((sidebarItem: any) => {
              return (
                <div className="mt-4 ">
                  <SidebarItems props={sidebarItem} version={props.version} />
                </div>
              );
            })}
            {/* {props.sidebar.map((item) => {
              return (
                <div className=" py-3 ">
                  {item?.type == "heading" && (
                    <h2 className="font-medium leading-tight text-lg mt-0 mb-2 text-gray-600 px-6">
                      {item.title}
                    </h2>
                  )}
                  <div className="text-gray-800 py-3 hover:bg-gray-100 hover:cursor-pointer px-6 ">
                    n kjnjk
                  </div>
                </div>
              );
            })} */}
          </div>
        </div>
      </nav>
    </Suspense>
  );
}

const SidebarItems = ({ props, version }: any) => {
  return (
    <>
      <div className="">
        {props?.type == "heading" && (
          <>
            {props.isCollapsed ? (
              <HeadingDropdown props={props} version={version} />
            ) : (
              // <div className="text-black">hihihi</div>
              <>
                <h2 className="font-medium leading-tight text-lg mt-0 mb-2 text-gray-600 px-6 ">
                  {props.title}
                </h2>
                {props?.pages.map((pageInfo: any) => {
                  if (pageInfo.type == "heading") {
                    return <SidebarItems props={pageInfo} version={version} />;
                  }
                  return (
                    <Link href={"/" + version + "/" + pageInfo.id}>
                      <div className="text-gray-800 py-3 hover:bg-gray-100 hover:cursor-pointer px-6 ">
                        {pageInfo.title}
                      </div>
                    </Link>
                  );
                })}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

const HeadingDropdown = ({ props, version }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion" id="accordionExample">
      <div className="accordion-item bg-white">
        <h2 className="accordion-header " id="headingOne">
          <button
            className="relative flex items-center w-full text-gray-800 justify-between flex px-6 accordion-body py-3 hover:bg-gray-100 hover:cursor-pointer px-6  hover:bg-gray-100 text-black rounded-none transition focus:outline-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="truncate-ellipsis">{props.title}</div>
            {isOpen ? (
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="caret-up"
                className="w-2 ml-2"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  fill="currentColor"
                  d="M288.662 352H31.338c-17.818 0-26.741-21.543-14.142-34.142l128.662-128.662c7.81-7.81 20.474-7.81 28.284 0l128.662 128.662c12.6 12.599 3.676 34.142-14.142 34.142z"
                ></path>
              </svg>
            ) : (
              <>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="caret-down"
                  className="w-2 ml-2"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                >
                  <path
                    fill="currentColor"
                    d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                  ></path>
                </svg>
              </>
            )}
          </button>
        </h2>
        <div
          id="collapseOne"
          // className="accordion-collapse show"
          className={`${
            isOpen ? "" : "hidden"
          } bg-white accordion-collapse show `}
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          {/* <div className=" py-4 bg-red.900 text-black px-5">
            hihi
          </div> */}
          {props?.pages.map((pageInfo: any) => {
            // console.log(pageInfo);
            if (pageInfo.type == "heading") {
              return <SidebarItems props={pageInfo} version={version} />;
            }
            return (
              <Link
                href={"/" + version + "/" + pageInfo.id}
                // onClick={() => handleItemClick(pageInfo)}
              >
                <div className="text-gray-800 pl-8 accordion-body py-3 hover:bg-gray-100 hover:cursor-pointer px-6">
                  {pageInfo.title}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
