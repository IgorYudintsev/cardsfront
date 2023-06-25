import React, { ChangeEvent, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { packsThunks } from "features/packs/packs.slice";
import { loadState, localHelper } from "helpers/localStorage";
import { GetPacksPayload } from "features/packs/packs.api";

type PropsType = {
  title: string;
  setTitle: (title: string) => void;
  pack: GetPacksPayload;
};

export const InputWithoutForm: React.FC<PropsType> = ({ title, setTitle, pack }) => {
  const userIDfromProfile = useAppSelector((state) => state.auth.profile!._id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      //dispatch(packsThunks.getPacks({ packName: title, pageCount: 8 })); // props.setLoading(false);
      dispatch(packsThunks.getPacks(localHelper(userIDfromProfile, pack)));
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [title]);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTitle(e.currentTarget.value);
  };

  return (
    <TextField
      value={title}
      size={"small"}
      id="outlined-uncontrolled"
      label="Search..."
      defaultValue=""
      onChange={onChangeHandler}
    />
  );
};
