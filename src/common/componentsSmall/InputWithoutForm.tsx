import React, { ChangeEvent, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { packsThunks } from "features/packs/packs.slice";
import { loadState, localHelper } from "helpers/localStorage";

export const InputWithoutForm: React.FC = (props) => {
  const userIDfromProfile = useAppSelector((state) => state.auth.profile!._id);
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      //dispatch(packsThunks.getPacks({ packName: title, pageCount: 8 })); // props.setLoading(false);
      dispatch(packsThunks.getPacks(localHelper(userIDfromProfile, { packName: title, pageCount: 8 })));
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [title]);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTitle(e.currentTarget.value);
  };

  return (
    <TextField size={"small"} id="outlined-uncontrolled" label="Search..." defaultValue="" onChange={onChangeHandler} />
  );
};

//loadState() ? { user_id: userIDfromProfile,
