import { setFinished } from '../../../../api/api';
import { SpinnerLoading } from '../../../dumb/info/spinnerLoading/spinnerLoading';
import { FilePicker } from '../../../dumb/inputs/filePicker/filePicker';
import './reportForm.sass';
import React, { useState } from 'react';

const ReportForm = props => {
    const [selectedFile, setSelectedFile] = useState();
    const [message, setMessage] = useState('');
    const [isUploaded, setIsUploaded] = useState(null);

    const handleSubmit = e => {
        e.preventDefault();
        const file = selectedFile[0];
        if (!(file && file.name.includes('xls'))){
            alert('Необходимо приложить отчет в формате xls');
            return;
        }
        setIsUploaded(false);
        setFinished(selectedFile[0]);
    }

    return (
        isUploaded === false 
            ? <SpinnerLoading waitingText={'Отправка файлов... Не закрывайте окно'}/>
            : (
                <form>
                    <FilePicker maxFiles={1} onSelected={setSelectedFile}></FilePicker>
                    <button 
                        className='submitReportForm'
                        onClick={handleSubmit}
                    >
                        Отправить
                    </button>
                </form>
            )
    );
};

export default ReportForm;
