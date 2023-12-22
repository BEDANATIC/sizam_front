import './filePicker.sass';
import React, { useEffect, useState } from 'react';

function SelectedFiles({files = []}){
    return (
        <ul className='selectedFiles'>
            {files.map(file => <li key={file.name}>{file.name}</li>)}
        </ul>
    );
}

function FilePicker({
    maxFiles=1,
    onSelected=() => {throw new Error('Dumb FilePicker: onSelect not setted')},
    ...props
}){
    const [selectedFiles, setSelectedFiles] = useState([]);
    useEffect(() => onSelected(selectedFiles), [selectedFiles]);
    const handleSelect = event => {
        setSelectedFiles(prev => [...prev, event.target.files[0]].slice(maxFiles * -1));
    };
    return (
        <div className='file-picker'>
            <label className="file-field">
                <h3>Перенесите файл в эту область или кликните для выбора в отдельном окне. Выбрано {selectedFiles.length}/{maxFiles}</h3>
                <SelectedFiles files={selectedFiles}/>
                <input
                    className='file'
                    name="file"
                    type="file"
                    onChange={handleSelect}
                />
            </label>
        </div>
    );
};

export {
    FilePicker
};
