import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "common/hooks";
import { packsThunks } from "features/packs/packs.slice";
import { Spreadsheet } from "common/componentsBIG/Spreadsheet";
import styled from "styled-components";
import { ButtonComponent } from "common/componentsSmall/ButtonComponent";

export type HeadersType = {
  name: string;
  align: "left" | "center";
};

export const Packs = () => {
  const dispatch = useAppDispatch();
  const packs = useAppSelector((state) => state.packs.cardPacks);
  useEffect(() => {
    // packsApi.getPacks().then((res) => console.log(res.data));
    dispatch(packsThunks.getPacks({ pageCount: 8 }));
  }, []);

  const headers: HeadersType[] = [
    { name: "name", align: "left" },
    { name: "cards", align: "center" },
    { name: "last updated", align: "center" },
    { name: "createde by", align: "center" },
    { name: "actions", align: "center" },
  ];

  const addPackHandler = () => {
    const payload = {
      cardsPack: { name: "MYPACK" },
    };
    dispatch(packsThunks.addPack(payload));
  };

  return (
    <div>
      <HeaderBlock>
        <h1 style={{ marginTop: "-10px" }}>Packs list</h1>
        <ButtonComponent buttonName={"Add new pack"} callback={addPackHandler} disabled={false} />
      </HeaderBlock>
      <Spreadsheet tableName={"PACKS"} packs={packs} headers={headers} />
    </div>
  );
};

const HeaderBlock = styled.div`
  margin-top: 20px;
  height: 35px;
  display: flex;
  justify-content: space-around;
`;
