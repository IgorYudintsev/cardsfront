import React, { ChangeEvent, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { packsThunks } from "features/packs/packs.slice";
import { loadState, localHelper } from "helpers/localStorage";

type PropsType = {
  value: number[];
  title: string;
  setTitle: (title: string) => void;
};

export const InputWithoutForm: React.FC<PropsType> = ({ value, title, setTitle }) => {
  const userIDfromProfile = useAppSelector((state) => state.auth.profile!._id);
  const dispatch = useAppDispatch();
  //const [title, setTitle] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      //dispatch(packsThunks.getPacks({ packName: title, pageCount: 8 })); // props.setLoading(false);
      dispatch(
        packsThunks.getPacks(
          localHelper(userIDfromProfile, {
            packName: title,
            min: value[0],
            max: value[1],
            pageCount: value[1] - value[0],
          })
        )
      );
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
