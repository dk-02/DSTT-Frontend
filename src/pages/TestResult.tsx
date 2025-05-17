import React from "react";
import Header from "../components/Header";
import { useLocation, useNavigate } from 'react-router-dom';

interface ReviewParamDTO {
    name: string;
    value: string;
}

interface EvalDTO {
    totalPrice: number;
    symptomsPrice: number;
    evals: {
        [paramId: string]: ReviewParamDTO[];
    };
}

interface LocationState {
    testResults?: EvalDTO;
    answers?: ParameterDTO[];
}

interface ParameterDTO {
    id: number;
    name: string;
    value: string;
    price: number;
}

const TestResult: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as LocationState | undefined;
    const testResults = state?.testResults;
    const answers = state?.answers;

    const { totalPrice, symptomsPrice, evals } = testResults || {};

    return (
        <div className="relative min-h-screen w-full bg-gray-800 text-white px-6 py-8">
            <Header />
            <h1 className="text-orange-500 text-4xl font-bold tracking-wide mb-6 mt-10">Rezultati</h1>

            {testResults ? (
                <div className="space-y-6">
                    <div className="bg-gray-700 p-4 rounded-xl shadow">
                        <p className="text-lg font-semibold">
                            Ukupna cijena traženih parametara:{" "}
                            <span className="text-green-400">{totalPrice}</span>
                        </p>
                        <p className="text-lg font-semibold">
                            Cijena svih simptoma za dijagnozu:{" "}
                            <span className="text-blue-400">{symptomsPrice}</span>
                        </p>
                    </div>

                    <div className="space-y-4">
                        {answers?.map(({ id, name, price }) => {
                            const reviews = evals?.[id.toString()];
                            return reviews ? (
                                <div key={id} className="bg-gray-700 p-4 rounded-xl shadow">
                                    <h2 className="text-xl font-bold text-orange-400 mb-2">
                                        {name}
                                    </h2>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>
                                            <span className="font-medium">Cijena</span>: {price}
                                        </li>
                                        {reviews.map((review, index) => (
                                             <li key={index}>
                                                <span className="font-medium">{review.name === "Is the parameter redundant?" ?  "Je li parametar redundantan?" : "Sigurnost dijagnoze"}</span>: {review.value === "No" ? "Ne" : review.value === "Yes" ? "Da" : review.value}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : null;
                        })}
                    </div>
                </div>
            ) : (
                <p className="text-red-400">Nema dostupnih rezultata za prikaz.</p>
            )}

            <div className="w-full flex justify-center mt-6">
                <button className="bg-orange-500 px-4 py-2 rounded-lg text-white text-lg font-semibold hover:bg-orange-600" onClick={() => navigate("/")}>Na početnu</button>
            </div>

        </div>
    );
};

export default TestResult;
