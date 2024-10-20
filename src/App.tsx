import React from 'react';
import './App.css';
import QrCode from "./components/QrCode";

function App()
{
    return (
        <div className="App">
            <header className="App-header">
                <QrCode image={null} url={"https://shd.de"}/>
            </header>

            <div className={"read-the-docs"}>Quellen: <a href="https://uploadcare.com/blog/how-to-upload-file-in-react">How to upload files in
                React</a></div>
        </div>
    );
}

export default App;
