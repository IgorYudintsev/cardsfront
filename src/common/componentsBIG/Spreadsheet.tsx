import React from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { CardPacks } from "features/packs/packs.api";
import styled from "styled-components";
import { HeadersType } from "features/packs/Packs";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { packsThunks } from "features/packs/packs.slice";
import EditIcon from "@mui/icons-material/Edit";
import SchoolIcon from "@mui/icons-material/School";
import { SearchFilter } from "common/componentsBIG/SearchFilter";

type PropsType = {
  tableName: string;
  packs: CardPacks[];
  headers: HeadersType[];
};
export const Spreadsheet = ({ packs, headers, tableName }: PropsType) => {
  const userIDfromProfile = useAppSelector((state) => state.auth.profile!._id);
  const dispatch = useAppDispatch();

  const cutter = (str: string, cut: number) => {
    if (cut === 13) {
      return str.length > cut ? `${str.slice(0, cut)}...` : str;
    }
    return str.length > cut ? `${str.slice(0, cut)}` : str;
  };

  const headersData = headers.map((el) => {
    return (
      <TableCell align={el.align}>
        <h3>{el.name}</h3>
      </TableCell>
    );
  });

  const deleteHandler = (id: string) => {
    dispatch(packsThunks.deletePack(id));
  };

  const updateHandler = (id: string) => {
    const payload = {
      cardsPack: {
        _id: id,
        name: "UPDATED PACK",
      },
    };
    dispatch(packsThunks.updatePack(payload));
  };

  return (
    <>
      <SearchFilter />
      <Title>{tableName}</Title>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>{headersData}</TableRow>
          </TableHead>
          <TableBody>
            {packs.map((row) => (
              <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {cutter(row.name, 13)}
                </TableCell>
                <TableCell align="center">{row.cardsCount}</TableCell>
                <TableCell align="center">{cutter(row.updated, 10)}</TableCell>
                <TableCell align="center">{cutter(row.user_name, 13)}</TableCell>
                <TableCell align="center">
                  <IconButton aria-label="read" onClick={() => {}}>
                    <SchoolIcon />
                  </IconButton>
                  {userIDfromProfile === row.user_id ? (
                    <>
                      <IconButton aria-label="delete" onClick={() => deleteHandler(row._id)}>
                        <DeleteIcon />
                      </IconButton>
                      <IconButton aria-label="update" onClick={() => updateHandler(row._id)}>
                        <EditIcon />
                      </IconButton>
                    </>
                  ) : (
                    ""
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

const Title = styled.h1`
  text-align: center;
`;
