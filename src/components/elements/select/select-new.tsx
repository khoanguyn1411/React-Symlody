export const asd = "123";
// import classNames from "classnames";
// import React, { ReactNode, useState } from "react";

// import { Portal } from "@/components";
// import { useHideOnClickOutside, usePositionPortal } from "@/hooks";

// import { SelectDisplayWrapper, SelectListWrapper } from "./select-components";
// import { TSelectGeneralProps, TStyle } from "./type";

// type TProps = {
//   list: readonly string[];
//   style: TStyle;
//   value: string;
//   onChange: (value: string) => void;
//   classNameDisplay?: TSelectGeneralProps["classNameDisplay"];
//   className?: TSelectGeneralProps["className"];
//   children: ReactNode;
//   isPortal: TSelectGeneralProps["isPortal"];
// };

// export const Select: React.FC<TProps> = ({
//   style,
//   classNameDisplay,
//   className,
//   children,
//   value,
//   onChange,
//   isPortal,
// }) => {
//   const [isShowContent, setIsShowContent] = useState<boolean>(false);
//   const { listRef, displayRef } = useHideOnClickOutside(
//     isShowContent,
//     setIsShowContent
//   );
//   const { position, setPositionList } = usePositionPortal<HTMLDivElement>({
//     displayRef,
//     isPortal,
//     placement: "bottom-left",
//   });

//   const handleToggleContent = () => {
//     setPositionList();
//     setIsShowContent(!isShowContent);
//   };

//   return (
//     <div className={className}>
//       <div className="relative cursor-pointer">
//         {/* Display */}
//         <SelectDisplayWrapper
//           classNameDisplay={classNameDisplay}
//           style={style}
//           ref={displayRef}
//           onClick={handleToggleContent}
//         >
//           {children}
//         </SelectDisplayWrapper>
//         {/* List */}
//         {isPortal && (
//           <Portal>
//             <ul ref={listRef}>
//               <SelectListWrapper
//                 isPortal={isPortal}
//                 position={position}
//                 isShowContent={isShowContent}
//                 style={style}
//               >
//                 <h1 className={classNames("pr-3", { "text-gray-400": !value })}>
//                   {value ? value + " " + (suffix ? suffix : "") : placeHolder}
//                 </h1>
//                 <span>
//                   <i
//                     className={classNames(
//                       "fas fa-angle-down text-lg -mr-5 duration-300 transition-transform",
//                       {
//                         "transform -rotate-180": isShowContent,
//                         "text-grey-400": !(style === "modal"),
//                       }
//                     )}
//                   />
//                 </span>
//               </SelectListWrapper>
//             </ul>
//           </Portal>
//         )}
//         {!isPortal && (
//           <ul ref={listRef}>
//             <SelectListWrapper
//               isPortal={isPortal}
//               isShowContent={isShowContent}
//               style={style}
//             >
//               <h1 className={classNames("pr-3", { "text-gray-400": !value })}>
//                 {value ? value + " " + (suffix ? suffix : "") : placeHolder}
//               </h1>
//               <span>
//                 <i
//                   className={classNames(
//                     "fas fa-angle-down text-lg -mr-5 duration-300 transition-transform",
//                     {
//                       "transform -rotate-180": isShowContent,
//                       "text-grey-400": !(style === "modal"),
//                     }
//                   )}
//                 />
//               </span>
//             </SelectListWrapper>
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };
