import * as React from "react";
import TablePagination from "@mui/material/TablePagination";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { loadState, localHelper } from "helpers/localStorage";
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

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatchFoo();
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [page]);

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
      rowsPerPageOptions={[10, 25, 50]}
    />
  );
};

//---------------------------------------------------------------------------------

// import * as React from "react";
// import TablePagination from "@mui/material/TablePagination";
// import { useAppDispatch, useAppSelector } from "common/hooks";
// import { loadState } from "helpers/localStorage";
// import { packsThunks } from "features/packs/packs.slice";
// import { useEffect } from "react";
// import { useDebounce } from "common/componentsSmall/useDebounce";
//
// export const Pagination = () => {
//   const maxCardsCount: number = useAppSelector((state) =>
//     state.packs.cardPacksTotalCount !== null ? state.packs.cardPacksTotalCount : 10
//   );
//   const userIDfromProfile = useAppSelector((state) => state.auth.profile!._id);
//   const dispatch = useAppDispatch();
//
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);
//   const debouncedValue = useDebounce(page, 500);
//
//   useEffect(() => {
//     dispatchFoo(0, rowsPerPage);
//   }, [debouncedValue]);
//
//   const dispatchFoo = (newPage: number = page, newRowsPerPage: number = rowsPerPage) => {
//     const timeoutId = setTimeout(() => {
//       dispatch(
//         packsThunks.getPacks(
//           loadState()
//             ? { user_id: userIDfromProfile, page: newPage + 1, pageCount: newRowsPerPage }
//             : { page: newPage + 1, pageCount: newRowsPerPage }
//         )
//       );
//     }, 1000);
//     return () => clearTimeout(timeoutId);
//   };
//
//   const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
//     setPage(newPage);
//     dispatchFoo(newPage);
//   };
//
//   const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const newRowsPerPage = parseInt(event.target.value);
//     setRowsPerPage(newRowsPerPage);
//     setPage(0);
//     dispatchFoo(0, newRowsPerPage);
//   };
//
//   return (
//     <TablePagination
//       component="div"
//       count={maxCardsCount}
//       page={page}
//       onPageChange={handleChangePage}
//       rowsPerPage={rowsPerPage}
//       onRowsPerPageChange={handleChangeRowsPerPage}
//       rowsPerPageOptions={[10, 25, 50]}
//     />
//   );
// };
//
