import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Landing: React.FC = () => {
    const navigate = useNavigate();

    const Topics = [
        {
            id: 1,
            name: "Medicina",
            navigateTo: "/medicina"
        },
        {
            id: 2,
            name: "Automehanika",
            navigateTo: "/automehanika"
        },
        {
            id: 3,
            name: "Kulinarstvo",
            navigateTo: "/kulinarstvo"
        },
        {
            id: 4,
            name: "Osobne usluge",
            navigateTo: "/usluge"
        }
    ]

    return (
        <div className={"relative min-h-screen w-full bg-gray-800"}>
            <Header />
            <div className="h-[calc(100vh-4.5rem)] w-full flex flex-col justify-center p-10">
                <div className="w-1/2">
                    <p className="text-gray-200 text-5xl font-bold tracking-wide leading-18">Učite na temelju situacija s kojima se susreću <span className="text-orange-500">stručnjaci</span></p>
                </div>
            </div>
            <div id="podrucja" className="min-h-screen w-full flex flex-col items-center text-gray-200">
                <div className="bg-gray-700 w-full p-10 flex justify-center items-center">
                    <p className="text-4xl font-bold tracking-wide">Istaknuta područja</p>
                </div>
                <div className="flex flex-col gap-10 w-full items-center py-10">
                    {Topics.map((topic, idx) => (
                        <div key={idx} data-aos="fade-right" className="h-[300px] w-1/2 border-2 border-orange-500 shadow-lg shadow-gray-950 rounded-2xl flex flex-col items-center p-5">
                            <div className="h-1/3">
                                <p className="text-3xl font-bold">{topic.name}</p>
                            </div>
                            <div className="h-2/3 flex items-end">
                                <button className="cursor-pointer bg-orange-500 px-10 py-3 rounded-3xl font-semibold text-lg hover:bg-orange-600 transition-all duration-250" onClick={() => navigate("/test")}>Kreni</button>
                            </div>
                        </div>
                    ))}

                    <button className="cursor-pointer border-b-2 mt-8 border-orange-500 hover:border-gray-100 px-10 py-3 font-semibold text-lg transition-all duration-250" onClick={() => navigate("/podrucja")}>Više</button>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Landing;
