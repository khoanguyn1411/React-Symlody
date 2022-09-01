import React from "react";

export const Demo = () => {
  return <div>Demo</div>;
};

// import {
//   Menu,
//   MenuHandler,
//   MenuItem,
//   MenuList,
// } from "@material-tailwind/react";
// import classNames from "classnames";
// import React, { useState } from "react";

// import { Button } from "@/components";

// import { TMenuProps, TPropsDropdownCompound } from "../type";

// export const DropDownWithAction: React.FC<TPropsDropdownCompound> = ({
//   menus,
//   widthContainer,
//   placement = "bottom-start",
//   hiddenAfterClick = false,
//   onClickMenu,
//   onClickButton,
// }) => {
//   const handleClickMenu = (key: string) => () => {
//     hiddenAfterClick && handleToggleList();
//     onClickMenu && onClickMenu(key);
//   };

//   const handleClickButton = (
//     event: React.MouseEvent<HTMLButtonElement, MouseEvent>
//   ) => {
//     event.stopPropagation();
//     onClickButton && onClickButton();
//   };

//   const [isShowList, setIsShowList] = useState<boolean>(false);
//   const handleToggleList = () => {
//     setIsShowList(!isShowList);
//   };

//   return (
//     <Menu handler={handleToggleList} open={isShowList} placement={placement}>
//       <div className="flex h-11">
//         <Button
//           onClick={(event) => handleClickButton(event)}
//           className="rounded-r-none"
//         >
//           Thêm tài sản
//         </Button>
//         <Button
//           isIconOnly
//           className="flex items-center justify-center w-4 h-full border-l rounded-l-none border-l-white hover:bg-primary-900 hover:border-l-white bg-primary-800"
//         >
//           <MenuHandler>
//             <span className="flex items-center px-2 h-11">
//               <i
//                 className={classNames(
//                   "fas fa-angle-down duration-300 transition-transform text-base",
//                   {
//                     "transform -rotate-180": isShowList,
//                   }
//                 )}
//               />
//             </span>
//           </MenuHandler>
//         </Button>
//       </div>
//       <MenuList
//         className={classNames(
//           ` rounded-md shadow-none bg-white border px-0 py-2`,
//           widthContainer
//         )}
//       >
//         {menus.map((item: TMenuProps, index: number) => (
//           <MenuItem
//             key={index}
//             onClick={handleClickMenu(item.key)}
//             className={classNames(
//               "rounded-none bg-white w-full hover:bg-gray-100 text-font-main hover:text-primary-800 transition-all duration-300"
//             )}
//           >
//             {item.prefix}
//             {item.key}
//             {item.suffix}
//           </MenuItem>
//         ))}
//       </MenuList>
//     </Menu>
//   );
// };
