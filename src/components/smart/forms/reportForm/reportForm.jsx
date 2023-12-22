import { setFinished, setAccepted, setApproved, setExpelled } from '../../../../api/api';
import { SpinnerLoading } from '../../../dumb/info/spinnerLoading/spinnerLoading';
import { DropList } from '../../../dumb/inputs/dropList/dropList';
import { FilePicker } from '../../../dumb/inputs/filePicker/filePicker';
import './reportForm.sass';
import React, { useState } from 'react';


const REPORT_TYPE_MAPPING = [
    {
        method: setFinished,
        name: 'О завершении модуля',
        filesRequired: 1
    },
    {
        method: setAccepted,
        name: 'О принятии',
        filesRequired: 1
    },
    {
        method: setApproved,
        name: 'О подтверждении',
        filesRequired: 1
    },
    {
        method: setExpelled,
        name: 'О зачислении',
        filesRequired: 3
    }
];


const ReportForm = props => {
    const [selectedFile, setSelectedFile] = useState();
    const [selectedReportTypeIdx, setSelectedReportTypeIdx] = useState(0);
    const [message, setMessage] = useState({type: 'info', text: ''});
    const [isUploaded, setIsUploaded] = useState(null);

    const handleSubmit = async e => {
        e.preventDefault();
        for (let file of selectedFile) {
            if (!(file && file.name.includes('xls'))){
                setMessage({type: 'error', text:'Необходимо приложить отчет в формате xls'});
                return;
            } 
        }
        setIsUploaded(false);
        try{
            await REPORT_TYPE_MAPPING[selectedReportTypeIdx].method(...selectedFile);
            setMessage({type: 'info', text: 'Данные успешно отправлены!'});
        } catch(err) {
            setMessage({type: 'error', text: err.message});
        }
        setIsUploaded(null);
    }
    
    return (
        isUploaded === false 
            ? <SpinnerLoading waitingText={'Отправка файлов... Не закрывайте окно'}/>
            : (
                <form className='reportForm'>
                    Тип отчета:
                    <DropList onChanged={setSelectedReportTypeIdx} variants={REPORT_TYPE_MAPPING.map(item => item.name)}/>
                    <FilePicker 
                        maxFiles={REPORT_TYPE_MAPPING[selectedReportTypeIdx].filesRequired} 
                        onSelected={setSelectedFile}
                    />
                    <button 
                        className='submitReportForm'
                        onClick={handleSubmit}
                    >
                        Отправить
                    </button>
                    <h4 style={{color: (message.type != 'info') ? 'red' : 'green'}}>{message.text || ''}</h4>
                </form>
            )
    );
};

export default ReportForm;
