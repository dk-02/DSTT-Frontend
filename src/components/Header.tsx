import React from "react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
    const navigate = useNavigate();

    const HeaderButtons = [
        {
            name: "Početna",
            navigateTo: "/"
        },
        {
            name: "Područja",
            navigateTo: "/podrucja"
        },
        {
            name: "O nama",
            navigateTo: "/o-nama"
        },
        {
            name: "Kontakt",
            navigateTo: "/kontakt"
        }
    ]

    return (
        <div className={"h-18 w-full bg-gray-800 flex justify-between items-center"}>
            <div className="flex justify-center items-center p-5">
                <p className="text-gray-100 text-4xl font-semibold">DS<span className="text-orange-500">TT</span></p>
            </div>           

            <div className="w-1/2 h-2/3 flex text-gray-100 text-lg justify-around px-5">
                {HeaderButtons.map((button, idx) => (
                    <div key={idx} className="w-1/5 flex justify-center items-center">
                        <div onClick={() => navigate(button.navigateTo)} className="relative group cursor-pointer w-1/2 flex justify-center items-center">
                            <span>{button.name}</span>
                            <span className="absolute left-0 -bottom-1 h-0.5 bg-gray-200 w-0 transition-all duration-250 group-hover:w-full"></span>
                        </div>
                    </div>
                ))}
                <div className="w-1/5 flex justify-center items-center">
                    <div onClick={() => navigate('/prijava')} className="text-white font-semibold cursor-pointer w-3/4 h-5/6 bg-orange-500 flex justify-center items-center rounded-4xl hover:bg-orange-600 transition-all duration-250"><p>Prijava</p></div>
                </div>
            </div>
        </div>
    );
};

export default Header;
