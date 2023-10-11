import supabase from "data/supabase";
import {
  ReactNode,
  createContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import Cookies from "universal-cookie";

interface adminData {
  id: string;
  name: string;
  position: string;
}

interface AuthContextType {
  admin: adminData[];
  setAdmin: (admin: adminData[]) => void;
  hasSession: boolean;
  setSession: (hasSession: boolean) => void;
  signout: () => void;
  signin: (hashedUserInput: string, remember: boolean) => void;
}

const AuthContext = createContext<AuthContextType>({
  admin: [],
  setAdmin: () => {},
  hasSession: false,
  setSession: () => {},
  signout: () => {},
  signin: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [admin, setAdmin] = useState<adminData[]>([]);
  const [hasSession, setSession] = useState<boolean>(false);
  const cookies = new Cookies();

  const getAdmin = useCallback(async () => {
    const hasCookie = cookies.get("token");
    if (typeof hasCookie !== "undefined") {
      const { data } = await supabase
        .from("admin")
        .select("id, name, position")
        .eq("token", hasCookie);
      if (data) {
        setAdmin(data);
        setSession(true);
      }
    }
  }, []);

  useEffect(() => {
    getAdmin();
  }, [getAdmin]);

  const signin = (hashedUserInput: string, remember: boolean): void => {
    var expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 1);
    cookies.set("token", hashedUserInput, {
      path: "/",
      expires: remember ? expiryDate : null,
      domain: "localhost",
      sameSite: "lax",
    });
    setSession(true);
  };

  const signout = () => {
    cookies.remove("token", { path: "/" });
    setAdmin([]);
    setSession(false);
  };

  return (
    <AuthContext.Provider
      value={{ setAdmin, admin, hasSession, setSession, signout, signin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
