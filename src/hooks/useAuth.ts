import { useContext } from "react";
import { AuthContext  } from "./Auth";

export function useAuth() {
  const value = useContext(AuthContext);

  return value;
}
