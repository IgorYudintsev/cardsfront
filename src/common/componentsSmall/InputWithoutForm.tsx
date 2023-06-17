import React, { ChangeEvent, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { useAppDispatch } from "common/hooks";
import { packsThunks } from "features/packs/packs.slice";

export const InputWithoutForm: React.FC = (props) => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(packsThunks.getPacks({ packName: title, pageCount: 8 })); // props.setLoading(false);
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
