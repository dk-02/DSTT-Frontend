import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

interface DiagnosisDTO {
    id: number;
    name: string;
}

interface ParameterDTO {
    id: number;
    name: string;
    value: string;
    price: number;
}

// interface ResponseData {
//     message: string;
//     data: null;
// }

interface UsedParam {
    question: string;
    answer: string;
}

const baseURL = import.meta.env.VITE_API_URL;

const Test: React.FC = () => {
    const location = useLocation();
    const state = location.state;
    const testId = state?.testId;

    // Odgovori - korišteni parametri i pokušaji pogađanja dijagnoze
    const [answers, setAnswers] = useState<ParameterDTO[]>([]);
    const [diagnosisAnswers, setDiagnosisAnswers] = useState<DiagnosisDTO[]>([]);
    const [usedParams, setUsedParams] = useState<UsedParam[]>([]);
    // Odabrani parametri i dijagnoze iz dropdowna
    const [selectedParameter, setSelectedParameter] = useState<string>("");
    const [selectedDiagnosis, setSelectedDiagnosis] = useState<string>("");
    // Dijalog
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    // Učitane vrijednosti
    const [parameters, setParameters] = useState<ParameterDTO[]>([]);
    const [possibleDiagnoses, setPossibleDiagnoses] = useState<DiagnosisDTO[]>([]);
    const [correctDiagnosisId, setCorrectDiagnosisId] = useState<number|null>(null); 

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${baseURL}/DST/getTestData/${testId}`). 
            then((res) => {
                const data = res.data.data;

                // console.log(data)

                setParameters(data.parameterDTO);
                setPossibleDiagnoses(data.diagnoses);
                setCorrectDiagnosisId(data.diagnosisDTO.id);
            }).catch((err) => {
                console.error("Failed to fetch data: ", err);
            });
    }, [testId]);

    
    const handleParameterGuess = () => {
        const selectedParam = parameters.find(p => p.id === Number(selectedParameter));

        if (selectedParam) {        
            setUsedParams(prev => [
                ...prev,
                { question: selectedParam.name, answer: selectedParam.value }
            ]);
    
            setAnswers(prev => [
                ...prev,
                selectedParam
            ]);

            setSelectedParameter("");
        }

    }

    const handleDiagnosisGuess = () => {
        const selectedDiag = possibleDiagnoses.find(p => p.id === Number(selectedDiagnosis));

        if (selectedDiag) {
            setDiagnosisAnswers(prev => [
                    ...prev,
                    { id: selectedDiag.id, name: selectedDiag.name }
                ]
            );

            if(selectedDiag.id === correctDiagnosisId) {
                setDialogOpen(true);
            } 

            setSelectedDiagnosis("");

        }
    }

    const handleSubmit = async () => {
        // console.log(answers)

        try {
            const response = await axios.post(`${baseURL}/DST/evaluateSolution`, {
                requestedParameters: answers,
                diagnosisId: diagnosisAnswers[diagnosisAnswers.length - 1].id
            });

            const evalData = response.data;
            // console.log("Rezultat evaluacije:", evalData);

            navigate('/testResult', {
                state: {
                    testResults: evalData.data
                }
            });

        } catch (error) {
            console.error("Greška pri evaluaciji rješenja:", error);
        }
    };


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
                                    {parameters.map((param) => (
                                        <option key={param.id} value={param.id} disabled={answers.some(a => a.id === param.id)}>{param.name}</option>
                                    ))}                        
                                </select>
                                <button className="cursor-pointer bg-orange-500 px-7 py-1 rounded-3xl font-semibold text-lg hover:bg-orange-600 transition-all duration-250 disabled:bg-gray-500 disabled:text-gray-700" disabled={selectedParameter === ""}  onClick={() => handleParameterGuess()}>Potvrdi</button>
                            </div>
                            {/* Diagnoses */}
                            <div className="flex gap-5">
                                <select 
                                    name="diagnosis" 
                                    id="diagnosis" 
                                    value={selectedDiagnosis} 
                                    onChange={(e) => setSelectedDiagnosis(e.target.value)}
                                    className="w-[500px] text-gray-200 bg-gray-700 px-3 py-2 rounded-xl"
                                >
                                    <option value="" disabled hidden>...</option>
                                    {possibleDiagnoses.map((diag) => (
                                        <option key={diag.id} value={diag.id} disabled={diagnosisAnswers.some(a => a.id === diag.id)}>{diag.name}</option>
                                    ))}                        
                                </select>
                                <button className="cursor-pointer bg-orange-500 px-7 py-1 rounded-3xl font-semibold text-lg hover:bg-orange-600 transition-all duration-250 disabled:bg-gray-500 disabled:text-gray-700" disabled={selectedDiagnosis === ""} onClick={() => handleDiagnosisGuess()}>Potvrdi</button>
                            </div>
                        </div>
                    </div>

                </div>            
                <div className="w-1/3 h-[calc(100vh-4.5rem)] bg-gray-700 flex flex-col items-center gap-5 py-5 text-gray-200 overflow-y-scroll">
                    <h2 className="font-semibold text-2xl">Iskorišteni upiti</h2>
                    {usedParams.map((param, idx) => (
                        <div key={idx} className="min-h-24 w-3/4 flex flex-col items-center bg-gray-800 rounded-3xl p-5 border-2 border-orange-500">
                            <p className="font-bold">{param.question}</p>
                            <p>{param.answer}</p>
                        </div>
                    ))}
                    <h2 className="font-semibold text-2xl">Pogrešne dijagnoze</h2>
                    {diagnosisAnswers.map((diag, idx) => (
                        <div key={idx} className="min-h-24 w-3/4 flex flex-col items-center justify-center bg-gray-800 rounded-3xl p-5 border-2 border-orange-500">
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
                        <button className="cursor-pointer bg-orange-500 px-4 py-2 rounded-lg text-white text-lg font-semibold hover:bg-orange-600" onClick={handleSubmit}>Završi</button>
                    </div>
                </div>
            </div>}
            

        </div>
    );
};

export default Test;
