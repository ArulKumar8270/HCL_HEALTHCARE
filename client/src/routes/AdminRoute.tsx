/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/auth";

const AdminRoute = () => {
    const [ok, setOk] = useState(false);
    const { auth, setAuth, LogOut, isAdmin, isContextLoading } = useAuth() || {};
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const authCheck = async () => {
            try {
                const res = await axios.get(
                    `${(process.env.VITE_SERVER_URL as string)}/api/v1/auth/admin-auth`,
                    {
                        headers: {
                            Authorization: auth?.token,
                        },
                    }
                );

                setOk(res.data.ok === true); // Update ok based on the response
            } catch (error) {
                console.log(error);

                if ((error as any).response?.status === 401 && !isContextLoading) {
                    // When isContextLoading becomes false, it means the context has been loaded
                    setTimeout(() => {
                        toast.error("Admin Privileges Required!", {
                            toastId: "userNotAdmin",
                        });

                        navigate("/", {
                            state: location.pathname,
                        });
                    }, 500);
                }
            }
        };
        !isContextLoading && authCheck();
    }, [auth?.token, isContextLoading, location.pathname, navigate]);

    return ok ? <Outlet /> : "loading...";
};

export default AdminRoute;
