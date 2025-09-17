import { LoginDto, RegisterDto } from "./auth.dto";
import axios from "axios";
export async function callRegisterEndpoint(user: RegisterDto) {
  await axios.post(`http://localhost:3050/v1/auth/register`, {
    ...user,
  }).catch((error) => {
   throw error.response?.data
  });
}

export async function callLoginEndpoint(user: LoginDto) {
  const res = await fetch(`${process.env.API_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(user),
    credentials: "include",
  });

  return res.json();
}
