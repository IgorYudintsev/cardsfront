import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { TablePagination } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { packsThunks } from "features/packs/packs.slice";
import { loadState } from "helpers/localStorage";

export const Pagination = () => {
  const maxCardsCount: number = useAppSelector((state) =>
    state.packs.cardPacksTotalCount !== null ? state.packs.cardPacksTotalCount : 10
  );
  const userIDfromProfile = useAppSelector((state) => state.auth.profile!._id);
  // const clean = useAppSelector((state) => state.packs.clean);
  const dispatch = useAppDispatch();
  let arr: number[] = [];
  let [pages, setPages] = useState(0); // нулевая порция (с 1-11)
  let [resArr, setResArr] = useState<number[]>([]); // здесь хранится наша порция
  let [rowsPerPage, setRowsPerPage] = useState(10); // в порции 10 котлет

  let handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPages(newPage);
  };
  let handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log(event.target.value);
    setRowsPerPage(parseInt(event.target.value, 10));
    setPages(0);
  };

  //даю новую порцию для отрисовки
  let paginatorFoo = () => {
    //         2порция * из10котлет=20   20< (2*10)+10
    //        i=20  ;   20<30  -т.е. дай мне с 20 по 30 ; давай вперед пока не станет 30
    for (let i = pages * rowsPerPage; i < pages * rowsPerPage + rowsPerPage; i++) {
      arr.push(i);
      console.log(pages * rowsPerPage);
    }
    // а теперь выйдя из фора, мы можем использовать useState
    setResArr(arr);
    dispatch(
      packsThunks.getPacks(
        loadState() ? { user_id: userIDfromProfile, page: arr[0], pageCount: 10 } : { page: arr[0], pageCount: 10 }
      )
    );
  };
  let pageHandler = (el: number) => {
    console.log(el);
    dispatch(
      packsThunks.getPacks(
        loadState() ? { user_id: userIDfromProfile, page: el, pageCount: 10 } : { page: el, pageCount: 10 }
      )
    );
    //setResArr([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  };

  // если поменяется [page или rowsPerPage] вызывай функцию   paginatorFoo()
  useEffect(() => {
    paginatorFoo();
  }, [pages, rowsPerPage]);

  // useEffect(() => {
  //   if (clean !== null) {
  //     dispatch(
  //       packsThunks.getPacks(
  //         loadState() ? { user_id: userIDfromProfile, page: 1, pageCount: 10 } : { page: 1, pageCount: 10 }
  //       )
  //     );
  //   }
  // }, [clean]);

  return (
    <div style={{ justifyContent: "space-around" }}>
      <TablePagination
        count={maxCardsCount}
        page={pages}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <div style={{ marginRight: "39%" }}>
        {resArr.map((el) => {
          return (
            <IconButton aria-label="delete">
              <span onClick={() => pageHandler(el)}> {el}</span>
            </IconButton>
          );
        })}
      </div>
    </div>
  );
};
