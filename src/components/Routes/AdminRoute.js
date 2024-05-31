import { useState, useEffect } from "react";
import { useAuth } from "../../context/Auth";
import { Outlet } from "react-router-dom";
import { API } from "../../utils/request";
import swal from "sweetalert";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();
  useEffect(() => {
    const authCheck = async () => {
      try {
        const { data } = await API.get("/api/v1/auth/admin-auth");

        if (data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        swal("Oops!", "You don't have access!", "error");
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path="" />;
}
