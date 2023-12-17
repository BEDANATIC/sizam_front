import './spinnerLoading.sass';

function SpinnerLoading({waitingText}){
    return (
        <div className='spinner'>
            {waitingText}
            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div> 
        </div>
    );
};

export {
    SpinnerLoading
};
