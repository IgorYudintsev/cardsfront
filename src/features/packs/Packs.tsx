import React, { useEffect } from "react";
import { packsApi } from "features/packs/packs.api";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { authThunks } from "features/packs/packs.slice";
import { Spreadsheet } from "common/componentsBIG/Spreadsheet";

export type HeadersType = {
  name: string;
  align: "left" | "center";
};

export const Packs = () => {
  const dispatch = useAppDispatch();
  const packs = useAppSelector((state) => state.packs.cardPacks);
  useEffect(() => {
    // packsApi.getPacks().then((res) => console.log(res.data));
    dispatch(authThunks.getPacks());
  }, []);

  const headers: HeadersType[] = [
    { name: "name", align: "left" },
    { name: "cards", align: "center" },
    { name: "last updated", align: "center" },
    { name: "createde by", align: "center" },
    { name: "actions", align: "center" },
  ];

  return (
    <div>
      <Spreadsheet tableName={"PACKS"} packs={packs} headers={headers} />
    </div>
  );
};
