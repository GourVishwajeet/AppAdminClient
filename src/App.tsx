
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import TopInfluencers from './routes/AudienceManagements/TopInfluencers';
import { data } from './routes/AudienceManagements/userdata';

function App() {
  

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TopInfluencers allUsers={data} />} />
      </Routes>
    </BrowserRouter>
    </>
   
  )
}

export default App;
