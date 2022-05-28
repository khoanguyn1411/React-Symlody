import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useAppDispatch } from "@/features";
import { loginAsync } from "@/features/reducers";

export const LoginContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async () => {
    const res = await dispatch(loginAsync({ email, password }));
    if (!res.payload) {
      toast.error("Đăng nhập thất bại");
      return;
    }
    navigate("/");
    toast.success("Đăng nhập thành công");
  };

  return (
    <div className="flex items-center justify-center p-4">
      <form className="space-y-4">
        <Input
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={onSubmit}>Login</Button>
      </form>
    </div>
  );
};
