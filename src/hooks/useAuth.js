// import { useContext } from "react";
// import AuthContext from "../context/AuthContext";

// const useAuth=()=>{
//     return useContext(AuthContext);
// };

// export default useAuth;

import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
};

export default useAuth;
