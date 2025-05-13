import React from "react";
import Header from "../components/Header";

const Login: React.FC = () => {

    return (
        <div className={"relative min-h-screen w-full bg-gray-800"}>
            <Header />
            <p className="text-orange-500 text-4xl font-bold tracking-wide">Prijava</p>
        </div>
    );
};

export default Login;
