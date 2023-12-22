import ReportForm from '../../smart/forms/reportForm/reportForm';
import './App.sass';

function App() {
  return (
    <div className="app">
      <h2>Сервис для отправки отчетов</h2>
      <div className='formWrapper'>
        <ReportForm className='sdf'/>
      </div>
    </div>
  );
}

export default App;
