import { COURSES, SET_ACCEPTED, SET_APPROVED, SET_EXPELLED, SET_FINISHED } from "./endpoints";

function getErrorType(code){
    switch(code){
        case code >= 400 && code < 500:
            return 'Ошибка на стороне пользователя';
        case code >= 500 && code < 600:
            return 'Ошибка на стороне сервиса';
        default:
            return 'Неизвестная ошибка';
    }
}

async function post(path, body){
    try{
        const response = await fetch(
            path,
            {
                method: 'POST',
                body: body 
            }
        );
        const msg = await response.json();
        if (!response.ok) {
            const errType = getErrorType(response.status);
            throw new Error(`${errType}: ${msg}`)
        }
        return msg;
    } catch (err) {
        console.log(err.message)
        throw new Error('Ошибка при подключении. Возможно хост не найден, или соединение было прервано. Ошибка: ' + err.message);
    }
}


async function getCourseData(id) {
    return await fetch(COURSES + id);
}

async function setFinished(excel_file){
    const data = new FormData();
    data.append('excel_file', excel_file, excel_file.name);
    return await post(SET_FINISHED, data);
}

async function setApproved(excel_file){
    const data = new FormData();
    data.append('excel_file', excel_file, excel_file.name);
    return await post(SET_APPROVED, data);
}

async function setAccepted(excel_file){
    const data = new FormData();
    data.append('excel_file', excel_file, excel_file.name);
    return await post(SET_ACCEPTED, data);
}

async function setExpelled(excel_file, reason_file, reason_file_ds){
    const data = new FormData();
    console.log(excel_file, reason_file, reason_file_ds)
    data.append('excel_file', excel_file, excel_file.name);
    data.append('reason_file', reason_file, reason_file.name);
    data.append('reason_file_ds', reason_file_ds, reason_file_ds.name);
    return await post(SET_EXPELLED, data);
}

export {
    setAccepted,
    setApproved,
    setExpelled,
    setFinished,
    getCourseData
}