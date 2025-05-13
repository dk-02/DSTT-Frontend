import React from "react";

const Footer: React.FC = () => {

    return (
        <footer className={"h-32 mt-14 w-full bg-gray-700 flex justify-center items-center"}>
            <p className="text-gray-200 font-bold tracking-wide">
                &copy; <span className="text-orange-500">{new Date().getFullYear()}</span> DS<span className="text-orange-500">TT</span> <span className="font-normal">- Sva prava pridržana.</span>
            </p>
        </footer>
    );
};

export default Footer;
