import { Route, Routes } from 'react-router-dom';
import './App.css';
import SearchBar from './SearchBar/SearchBar';
import Table from './SearchBar/Table/Table';

function App() {
  return (
    <>
      <SearchBar />
      {/* <Routes>
        <Route path='/*' element={<Table />}/>
      </Routes> */}
    </>
  );
}

export default App;
