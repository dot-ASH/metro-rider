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
  signin: (
    hashedUserInput: string,
    remember: boolean,
    id: number
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  admin: [],
  setAdmin: () => {},
  hasSession: false,
  setSession: () => {},
  signout: () => {},
  signin: async () => {
    return Promise.resolve();
  },
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [admin, setAdmin] = useState<adminData[]>([]);
  const [hasSession, setSession] = useState<boolean>(false);
  const cookies = new Cookies();
  const hasCookie = cookies.get("token");

  const getAdmin = useCallback(async () => {
    if (typeof hasCookie !== "undefined") {
      const { data } = await supabase
        .from("Auth")
        .select("id")
        .eq("token", hasCookie);
      let id = data[0]?.id;
      if (id) {
        setSession(true);
        const { data } = await supabase
          .from("admin")
          .select("id, name, position")
          .eq("id", id);
        setAdmin(data);
      }
    } else {
      setAdmin([]);
      setSession(false);
    }
  }, [hasCookie]);

  useEffect(() => {
    getAdmin();
  }, [getAdmin]);

  const signin = async (
    hashedUserInput: string,
    remember: boolean,
    id: number
  ): Promise<void> => {
    const { error } = await supabase
      .from("Auth")
      .insert({ token: hashedUserInput, id: id });
    if (error) {
      throw new Error(error.message);
    }
    var expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 1);
    cookies.set("token", hashedUserInput, {
      path: "/",
      expires: remember ? expiryDate : null,
      domain: window.location.hostname,
      sameSite: "lax",
    });
    setSession(true);
  };

  const signout = async () => {
    const { error } = await supabase
      .from("Auth")
      .delete()
      .eq("token", hasCookie);
    if (error) {
      throw new Error(error.message);
    }
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
