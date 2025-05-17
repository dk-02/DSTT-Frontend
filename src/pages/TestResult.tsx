import React from "react";
import Header from "../components/Header";
import { useLocation } from 'react-router-dom';

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
}

const TestResult: React.FC = () => {
    const location = useLocation();
    const state = location.state as LocationState | undefined;
    const testResults = state?.testResults;

    const { totalPrice, symptomsPrice, evals } = testResults || {};

    // console.log(testResults?.symptomsPrice)

    return (
        <div className="relative min-h-screen w-full bg-gray-800 text-white px-6 py-8">
            <Header />
            <h1 className="text-orange-500 text-4xl font-bold tracking-wide mb-6">Rezultati</h1>

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
                        {Object.entries(evals || {}).map(([paramId, reviews]) => (
                            <div key={paramId} className="bg-gray-700 p-4 rounded-xl shadow">
                                <h2 className="text-xl font-bold text-orange-400 mb-2">
                                    Parametar ID: {paramId}
                                </h2>
                                <ul className="list-disc list-inside space-y-1">
                                    {reviews.map((review, index) => (
                                        <li key={index}>
                                            <span className="font-medium">{review.name}</span>: {review.value}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p className="text-red-400">Nema dostupnih rezultata za prikaz.</p>
            )}
        </div>
    );
};

export default TestResult;
