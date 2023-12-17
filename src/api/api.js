import { COURSES, SET_ACCEPTED, SET_APPROVED, SET_EXPELLED, SET_FINISHED } from "./endpoints";

async function getCourseData(id) {
    return await fetch(COURSES + id);
}

async function setFinished(excel_file){
    const data = new FormData();
    data.append('excel_file', excel_file, excel_file.name);
    return await fetch(
        SET_FINISHED,
        {
            method: 'POST',
            body: data 
        }
    );
}

async function setApproved(excel_file){
    const data = new FormData();
    data.append('excel_file', excel_file, excel_file.name);
    return await fetch(
        SET_APPROVED,
        {
            method: 'POST',
            body: data 
        }
    );
}

async function setAccepted(excel_file){
    const data = new FormData();
    data.append('excel_file', excel_file, excel_file.name);
    return await fetch(
        SET_ACCEPTED,
        {
            method: 'POST',
            body: data 
        }
    );
}

async function setExpelled(excel_file, reason_file, reason_file_ds){
    const data = new FormData();
    data.append('excel_file', excel_file, excel_file.name);
    data.append('excel_file', reason_file, reason_file.name);
    data.append('excel_file', reason_file_ds, reason_file_ds.name);
    return await fetch(
        SET_EXPELLED,
        {
            method: 'POST',
            body: data 
        }
    );
}

export {
    setAccepted,
    setApproved,
    setExpelled,
    setFinished,
    getCourseData
}