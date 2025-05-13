import React, { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

interface DiagnosisDTO {
    id: number;
    name: string;
}

interface ParameterDTO {
    id: number;
    value: string;
    price: number;
}

interface ResponseData {
    message: string;
    data: null;
}

interface UsedParam {
    question: string;
    answer: string;
}

const Test: React.FC = () => {

    const [answers, setAnswers] = useState<ParameterDTO[]>([]);
    const [diagnosisAnswers, setDiagnosisAnswers] = useState<DiagnosisDTO[]>([]);
    const [selectedParameter, setSelectedParameter] = useState<string>("");
    const [selectedDiagnosis, setSelectedDiagnosis] = useState<string>("");
    const [usedParams, setUsedParams] = useState<UsedParam[]>([]);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    const navigate = useNavigate();

    const parameterList: ParameterDTO[] = [
        {
            id: 1,
            value: "Param 1",
            price: 2
        },
        {
            id: 2,
            value: "Param 2",
            price: 3
        },
        {
            id: 3,
            value: "Param 3",
            price: 5
        },
        {
            id: 4,
            value: "Param 4",
            price: 12
        },
        {
            id: 5,
            value: "Param 5",
            price: 4
        },
        {
            id: 6,
            value: "Param 6",
            price: 8
        }
    ];

    const responseList: ResponseData[] = [
        {
            message: "Da",
            data: null
        },
        {
            message: "Ne",
            data: null
        },
        {
            message: "Da",
            data: null
        },
        {
            message: "Da",
            data: null
        },
        {
            message: "Ne",
            data: null
        },
        {
            message: "Ne",
            data: null
        }
    ];

    const diagnoses = [
        {
            id: 1,
            text: "Dijagnoza 1",
            correct: false
        },
        {
            id: 2,
            text: "Dijagnoza 2",
            correct: false
        },
        {
            id: 3,
            text: "Dijagnoza 3",
            correct: false
        },
        {
            id: 4,
            text: "Dijagnoza 4",
            correct: true
        },
        {
            id: 5,
            text: "Dijagnoza 5",
            correct: false
        },
        {
            id: 6,
            text: "Dijagnoza 6",
            correct: false
        },
        {
            id: 7,
            text: "Dijagnoza 7",
            correct: false
        }
    ];

    const handleParameterGuess = () => {
        const selectedParam = parameterList.find(p => p.id === Number(selectedParameter));

        if (selectedParam) {
            // sad imaš selectedParam.id, selectedParam.value, selectedParam.price
            console.log("Odabrano:", selectedParam);
        
            let ans = "";
            responseList.forEach((res, idx) => {
                if(idx === Number(selectedParameter) - 1) {
                    ans = res.message
                }
            })

            setUsedParams(prev => [
                ...prev,
                { question: selectedParam.value, answer: ans}
            ]);
    
            setAnswers(prev => [
                ...prev,
                { id: selectedParam.id, value: selectedParam.value, price: selectedParam.price}
            ]);

            setSelectedParameter("");
        }
    }

    const handleDiagnosisGuess = () => {
        const selectedDiag = diagnoses.find(p => p.id === Number(selectedDiagnosis));

        if (selectedDiag) {
            // sad imaš selectedParam.id, selectedParam.value, selectedParam.price
            console.log("Odabrano:", selectedDiag);

            setDiagnosisAnswers(
                prev => [
                    ...prev,
                    { id: selectedDiag.id, name: selectedDiag.text }
                ]
            );

            if(!selectedDiag.correct) {
                setSelectedDiagnosis("");
            } else {
                setDialogOpen(true);
            }
        
    

        }
    }

    return (
        <div className={"relative h-screen w-full bg-gray-800"}>
            <Header />
            <div className="flex w-full">
                <div className="w-2/3 h-[calc(100vh-4.5rem)] flex flex-col items-center p-10">
                    <h1 className="text-orange-500 text-4xl font-bold tracking-wide mb-10">Test</h1>

                    <div>
                        <div className="mb-5">
                            <p className="text-gray-200 text-justify text-lg">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ea voluptas placeat. Molestias nobis laborum provident libero suscipit eum! Dolorum doloremque eveniet consectetur libero tempora, error provident repudiandae adipisci nobis? Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ea voluptas placeat. Molestias nobis laborum provident libero suscipit eum! Dolorum doloremque eveniet consectetur libero tempora, error provident repudiandae adipisci nobis? Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ea voluptas placeat. Molestias nobis laborum provident libero suscipit eum! Dolorum doloremque eveniet consectetur libero tempora, error provident repudiandae adipisci nobis?
                            </p>
                        </div>
                        <div className="flex flex-col gap-5">
                            {/* Parameters */}
                            <div className="flex gap-5">
                                <select 
                                    name="parameter" 
                                    id="parameter" 
                                    value={selectedParameter} 
                                    onChange={(e) => setSelectedParameter(e.target.value)}
                                    className="w-[500px] text-gray-200 bg-gray-700 px-3 py-2 rounded-xl"
                                >
                                    <option value="" disabled hidden>...</option>
                                    {parameterList.map((param, idx) => (
                                        <option key={idx} value={param.id} disabled={answers.some(a => a.id === param.id)}>{param.value}</option>
                                    ))}                        
                                </select>
                                <button className="cursor-pointer bg-orange-500 px-7 py-1 rounded-3xl font-semibold text-lg hover:bg-orange-600 transition-all duration-250 disabled:bg-gray-500 disabled:text-gray-700" disabled={selectedParameter === ""}  onClick={() => handleParameterGuess()}>Potvrdi</button>
                            </div>
                            {/* Diagnoses */}
                            <div className="flex gap-5">
                                <select 
                                    name="parameter" 
                                    id="parameter" 
                                    value={selectedDiagnosis} 
                                    onChange={(e) => setSelectedDiagnosis(e.target.value)}
                                    className="w-[500px] text-gray-200 bg-gray-700 px-3 py-2 rounded-xl"
                                >
                                    <option value="" disabled hidden>...</option>
                                    {diagnoses.map((diag, idx) => (
                                        <option key={idx} value={diag.id} disabled={diagnosisAnswers.some(a => a.id === diag.id)}>{diag.text}</option>
                                    ))}                        
                                </select>
                                <button className="cursor-pointer bg-orange-500 px-7 py-1 rounded-3xl font-semibold text-lg hover:bg-orange-600 transition-all duration-250 disabled:bg-gray-500 disabled:text-gray-700" disabled={selectedDiagnosis === ""}  onClick={() => handleDiagnosisGuess()}>Potvrdi</button>
                            </div>
                        </div>
                    </div>

                </div>            
                <div className="w-1/3 h-[calc(100vh-4.5rem)] bg-gray-700 flex flex-col items-center gap-5 py-5 text-gray-200 overflow-y-scroll">
                    <h2 className="font-semibold text-2xl">Iskorišteni upiti</h2>
                    {usedParams.map((param, idx) => (
                        <div key={idx} className="min-h-24 w-1/2 flex flex-col items-center bg-gray-800 rounded-3xl p-5 border-2 border-orange-500">
                            <p className="font-bold">{param.question}</p>
                            <p>{param.answer}</p>
                        </div>
                    ))}
                    <h2 className="font-semibold text-2xl">Pogrešne dijagnoze</h2>
                    {diagnosisAnswers.map((diag, idx) => (
                        <div key={idx} className="min-h-24 w-1/2 flex flex-col items-center justify-center bg-gray-800 rounded-3xl p-5 border-2 border-orange-500">
                            <p className="font-bold">{diag.name}</p>
                        </div>
                    ))}
                </div>
            </div>

            {dialogOpen === true && <div className="fixed inset-0 bg-black/20 backdrop-blur-xs flex items-center justify-center z-50">
                <div className="bg-gray-600 rounded-2xl w-1/2 h-1/2 p-6 shadow-xl flex flex-col items-center justify-between">
                    <h2 className="text-white text-3xl font-bold">Potvrda</h2>
                    <p className="text-white text-lg text-center w-4/5">Postavljena je ispravna dijagnoza. Kako biste dobili detaljno izvješće o uspjehu na ovom scenariju, pritisnite "Završi".</p>
                    <div>
                        <button className="bg-orange-500 px-4 py-2 rounded-lg text-white text-lg font-semibold hover:bg-orange-600" onClick={() => navigate("/testResult")}>Završi</button>
                    </div>
                </div>
            </div>}
            

        </div>
    );
};

export default Test;
