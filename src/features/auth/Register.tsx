import { useAppDispatch } from "app/hooks";
import { authThunks } from "features/auth/auth.slice";

export const Register = () => {
  const dispatch = useAppDispatch();

  const registerHandler = () => {
    const payload = {
      email: "dollarselephant1@gmail.com",
      password: "123456781",
    };
    dispatch(authThunks.register({ payload }));
  };

  return (
    <div>
      <h1>Register</h1>
      <button onClick={registerHandler}>register</button>
    </div>
  );
};
