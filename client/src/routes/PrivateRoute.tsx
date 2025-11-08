/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/auth";

const PrivateRoute = () => {
    const [ok, setOk] = useState(false);
    const { auth, setAuth, LogOut, isContextLoading } = useAuth() || {};
    console.log(auth?.token, "authPrivateRoute");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const authCheck = async () => {
            try {
                const res = await axios.get(
                    `${(process.env.VITE_SERVER_URL as string)}/api/v1/auth/user-auth`,
                    {
                        headers: {
                            Authorization: auth?.token,
                        },
                    }
                );

                res.data.ok ? setOk(true) : setOk(false);
            } catch (error) {
                console.log(error);

                if ((error as any).response.status === 401 && !isContextLoading) {
                    //check for authentication when context gets updated from cookie
                    setTimeout(() => {
                        toast.error("Please Log in to access Details!", {
                            toastId: "userNotLoggedIn",
                        });
                        navigate("/login", {
                            state: location.pathname,
                        });
                    }, 500);
                }
            }
        };
        !isContextLoading && authCheck();
    }, [auth?.token, isContextLoading, location.pathname, navigate]);

    return ok ? <Outlet /> : <div>Loading...</div>;
};

export default PrivateRoute;
