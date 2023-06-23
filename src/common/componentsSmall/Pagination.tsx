import * as React from "react";
import TablePagination from "@mui/material/TablePagination";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { loadState } from "helpers/localStorage";
import { packsThunks } from "features/packs/packs.slice";
import { useEffect } from "react";

export const Pagination = () => {
  const maxCardsCount: number = useAppSelector((state) =>
    state.packs.cardPacksTotalCount !== null ? state.packs.cardPacksTotalCount : 10
  );
  const userIDfromProfile = useAppSelector((state) => state.auth.profile!._id);

  const dispatch = useAppDispatch();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  console.log(rowsPerPage);

  const dispatchFoo = (newPage: number = page, newRowsPerPage: number = rowsPerPage) => {
    dispatch(
      packsThunks.getPacks(
        loadState()
          ? { user_id: userIDfromProfile, page: newPage + 1, pageCount: newRowsPerPage }
          : { page: newPage + 1, pageCount: newRowsPerPage }
      )
    );
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
    dispatchFoo(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newRowsPerPage = parseInt(event.target.value);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    dispatchFoo(0, newRowsPerPage);
  };

  return (
    <TablePagination
      component="div"
      count={maxCardsCount}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};

//---------------------------------------------------------------------------------
// import React, { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "../hooks";
// import { TablePagination } from "@mui/material";
// import IconButton from "@mui/material/IconButton";
// import { packsThunks } from "features/packs/packs.slice";
// import { loadState } from "helpers/localStorage";
//
// export const Pagination = () => {
//   const maxCardsCount: number = useAppSelector((state) =>
//     state.packs.cardPacksTotalCount !== null ? state.packs.cardPacksTotalCount : 10
//   );
//   const userIDfromProfile = useAppSelector((state) => state.auth.profile!._id);
//   // const clean = useAppSelector((state) => state.packs.clean);
//   const dispatch = useAppDispatch();
//   let arr: number[] = [];
//   let [pages, setPages] = useState(0); // нулевая порция (с 1-11)
//   //let [resArr, setResArr] = useState<number[]>([]); // здесь хранится наша порция
//   let [rowsPerPage, setRowsPerPage] = useState(10); // в порции 10 котлет
//
//   let handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
//     setPages(newPage);
//   };
//   let handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     console.log(event.target.value);
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPages(0);
//   };
//
//   //даю новую порцию для отрисовки
//   let paginatorFoo = () => {
//     //         2порция * из10котлет=20   20< (2*10)+10
//     //        i=20  ;   20<30  -т.е. дай мне с 20 по 30 ; давай вперед пока не станет 30
//     // console.log(pages, rowsPerPage);
//     for (let i = pages * rowsPerPage; i < pages * rowsPerPage + rowsPerPage; i++) {
//       arr.push(i);
//       //console.log(pages * rowsPerPage);
//     }
//     // а теперь выйдя из фора, мы можем использовать useState
//     //setResArr(arr);
//     dispatch(
//       packsThunks.getPacks(
//         loadState() ? { user_id: userIDfromProfile, page: arr[0], pageCount: 10 } : { page: arr[0], pageCount: 10 }
//       )
//     );
//   };
//
//   // если поменяется [page или rowsPerPage] вызывай функцию   paginatorFoo()
//   useEffect(() => {
//     paginatorFoo();
//   }, [pages, rowsPerPage]);
//
//   return (
//     <div style={{ justifyContent: "space-around" }}>
//       <TablePagination
//         count={maxCardsCount} //всего карточек
//         page={pages} //номер порции (начинаем с нуля)
//         rowsPerPage={rowsPerPage}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </div>
//   );
// };

//-------------------------------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "../hooks";
// import { TablePagination } from "@mui/material";
// import IconButton from "@mui/material/IconButton";
// import { packsThunks } from "features/packs/packs.slice";
// import { loadState } from "helpers/localStorage";
//
// export const Pagination = () => {
//   const maxCardsCount: number = useAppSelector((state) =>
//     state.packs.cardPacksTotalCount !== null ? state.packs.cardPacksTotalCount : 10
//   );
//   const userIDfromProfile = useAppSelector((state) => state.auth.profile!._id);
//   // const clean = useAppSelector((state) => state.packs.clean);
//   const dispatch = useAppDispatch();
//   let arr: number[] = [];
//   let [pages, setPages] = useState(0); // нулевая порция (с 1-11)
//   //let [resArr, setResArr] = useState<number[]>([]); // здесь хранится наша порция
//   let [rowsPerPage, setRowsPerPage] = useState(10); // в порции 10 котлет
//
//   let handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
//     setPages(newPage);
//   };
//   let handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     console.log(event.target.value);
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPages(0);
//   };
//
//   //даю новую порцию для отрисовки
//   let paginatorFoo = () => {
//     //         2порция * из10котлет=20   20< (2*10)+10
//     //        i=20  ;   20<30  -т.е. дай мне с 20 по 30 ; давай вперед пока не станет 30
//     // console.log(pages, rowsPerPage);
//     for (let i = pages * rowsPerPage; i < pages * rowsPerPage + rowsPerPage; i++) {
//       // dispatch(
//       //   packsThunks.getPacks(
//       //     loadState()
//       //       ? { user_id: userIDfromProfile, page: arr[0], pageCount: rowsPerPage }
//       //       : { page: arr[0], pageCount: rowsPerPage }
//       //   )
//       // );
//
//       arr.push(i);
//       //console.log(pages * rowsPerPage);
//     }
//     // а теперь выйдя из фора, мы можем использовать useState
//     //setResArr(arr);
//     dispatch(
//       packsThunks.getPacks(
//         loadState()
//           ? { user_id: userIDfromProfile, page: arr[0], pageCount: rowsPerPage }
//           : { page: arr[0], pageCount: rowsPerPage }
//       )
//     );
//   };
//
//   // если поменяется [page или rowsPerPage] вызывай функцию   paginatorFoo()
//   useEffect(() => {
//     paginatorFoo();
//   }, [pages, rowsPerPage]);
//
//   return (
//     <div style={{ justifyContent: "space-around" }}>
//       <TablePagination
//         count={maxCardsCount} //всего карточек
//         page={pages} //номер порции (начинаем с нуля)
//         rowsPerPage={rowsPerPage}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </div>
//   );
// };
