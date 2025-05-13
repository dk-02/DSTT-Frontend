import React from "react";
import Header from "../components/Header";

const Test: React.FC = () => {

    return (
        <div className={"relative min-h-screen w-full bg-gray-800"}>
            <Header />
            <p className="text-orange-500 text-4xl font-bold tracking-wide">Test</p>
        </div>
    );
};

export default Test;
