import React, { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "common/hooks";
import { packsActions, packsThunks } from "features/packs/packs.slice";
import { Spreadsheet } from "common/componentsBIG/Spreadsheet";
import styled from "styled-components";
import { ButtonComponent } from "common/componentsSmall/ButtonComponent";
import { loadState } from "helpers/localStorage";
import { AddPack, GetPacksPayload } from "features/packs/packs.api";
import { Pagination } from "common/componentsSmall/Pagination";

export type HeadersType = {
  name: string;
  align: "left" | "center";
};

export type PayloadTypeForUpdate = {
  cardsPack: AddPack;
};

export const Packs = () => {
  const dispatch = useAppDispatch();
  const packs = useAppSelector((state) => state.packs.cardPacks);
  const userIDfromProfile = useAppSelector((state) => state.auth.profile!._id);
  const [valueRange, setValueRange] = React.useState<number[]>([0, 10]); //RANGE
  const [titleSearch, setTitleSearch] = useState(""); //SEARCH

  const pack: GetPacksPayload = {
    min: valueRange[0],
    max: valueRange[1],
    pageCount: valueRange[1] - valueRange[0],
    packName: titleSearch,
  };

  useEffect(() => {
    //dispatch(packsThunks.getPacks({ pageCount: 8 }));
    dispatch(packsThunks.getPacks(loadState() ? { user_id: userIDfromProfile, pageCount: 10 } : { pageCount: 10 }));
  }, []);

  const headers: HeadersType[] = [
    { name: "name", align: "left" },
    { name: "cards", align: "center" },
    { name: "last updated", align: "center" },
    { name: "createde by", align: "center" },
    { name: "actions", align: "center" },
  ];

  const addPackHandler = () => {
    const payload: PayloadTypeForUpdate = {
      cardsPack: { name: "MYPACK" },
    };
    // dispatch(packsThunks.addPack(payload));
    dispatch(packsThunks.addPack({ userIDfromProfile: userIDfromProfile, payload }));
  };

  return (
    <div>
      <HeaderBlock>
        <h1 style={{ marginTop: "-10px" }}>Packs list</h1>
        <ButtonComponent buttonName={"Add new pack"} callback={addPackHandler} disabled={false} />
      </HeaderBlock>
      <Spreadsheet
        tableName={"PACKS"}
        packs={packs}
        headers={headers}
        valueRange={valueRange}
        setValueRange={setValueRange}
        titleSearch={titleSearch}
        setTitleSearch={setTitleSearch}
        pack={pack}
      />
      <PaginationStyle>
        <Pagination pack={pack} />
      </PaginationStyle>
    </div>
  );
};

const PaginationStyle = styled.div`
  margin-left: 28%;
`;

const HeaderBlock = styled.div`
  margin-top: 20px;
  height: 35px;
  display: flex;
  justify-content: space-around;
`;
