import { useContext, createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
// @ts-ignore
import Cookies from "js-cookie";

interface AuthContextType {
    auth: {
        user: any; // You might want to define a more specific User interface
        token: string;
    };
    setAuth: React.Dispatch<React.SetStateAction<{ user: any; token: string }>>;
    LogOut: () => void;
    isAdmin: number;
    isContextLoading: boolean;
    isCompanyEnabled: boolean;
    setIsCompanyEnabled: React.Dispatch<React.SetStateAction<boolean>>;
    companyDetails: any; // You might want to define a more specific Company interface
    setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
    refetch: boolean;
    setSelectedCompany: React.Dispatch<React.SetStateAction<any>>; // You might want to define a more specific Company interface
    selectedCompany: any; // You might want to define a more specific Company interface
    userPermissions: any[]; // You might want to define a more specific Permission interface
    loadingPermissions: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: "",
    });
    const [isAdmin, setIsAdmin] = useState(0);
    const [isContextLoading, setIsContextLoading] = useState(true);
    const [refetch, setRefetch] = useState(false); // {{ edit_7 }}
    useEffect(() => {
        const data = Cookies.get("auth");
        if (data) {
            const parsedData = JSON.parse(data);
            setAuth({
                user: parsedData.user,
                token: parsedData.token,
            });
            let isCompanyEnabled = parsedData?.user?.role === 1 || parsedData?.user?.role === 3;
            setIsAdmin(isCompanyEnabled ? 1 : 0);
        }
        setIsContextLoading(false);
    }, []);
    //Function to Logout user
    const LogOut = () => {
        setAuth({
            ...auth,
            user: null,
            token: "",
        });
        Cookies.remove("auth");
        toast.success("Logged out Successfully!", {
            toastId: "LogOut",
        });
    };

    return (
        <AuthContext.Provider
            value={{ auth, setAuth, LogOut, isAdmin, isContextLoading,setRefetch, refetch}}
        >
            {children}
        </AuthContext.Provider>
    );
};

//custom hook->
const useAuth = () => {
    return useContext(AuthContext);
};

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
