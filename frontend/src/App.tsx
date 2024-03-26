import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

    const pingBackend = async () => {
        try {
            const response = await fetch('http://127.0.0.1:4000', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        pingBackend()
    }, [])

    return (
        <>
            <header className="App-header">
                <img src={reactLogo} className="App-logo" alt="reactLogo" />
                <img src={viteLogo} className="App-logo" alt="viteLogo" />
                <p>
                    Edit <code>App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
                <button onClick={pingBackend}>Ping DB</button>
            </header>

        </>
    )
}

export default App
