import Form from './components/form/Form'
import './App.css'
import { Dashboard } from './components/dashboard/Dashboard'
import { useEffect, useState } from 'react';
const apiurl = import.meta.env.VITE_API_URL;
const env = import.meta.env.VITE_NODE_ENV;

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    await update()
  }, []);

  const update = async () => {
    let result = await fetch(apiurl);
    let bmbmdata = await result.json();

    setTimeout(() => {
        setData(bmbmdata);
        setLoading(false);
    }, env === 'development' ? 2000 : 0);
  }

  return (
    <>
    <div className="container-fluid d-flex flex-column mt-1 align-items-center">
      <div className="loader-header">
        <h1>BoomBoomTrackr <span>💩</span></h1>
        {
          loading && (
            <div className="refresh-spinner spinner-border spinner-border-sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )
        }
      </div>
      <Form update={update} setLoading={setLoading}/>
    </div>
      <Dashboard bmbmdata={data} loading={loading}/>
    </>
  )
}

export default App
