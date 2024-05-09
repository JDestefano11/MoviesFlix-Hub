import { createRoot } from 'react-dom/client'; 

import "./index.scss"; 

// Main Component
const MyFlixApplication = () => {
    return (
        <div className="my-flix">
            <div>Good morning</div>
        </div>
    );
};

// Finds the root of app 
const container = document.querySelector("#root"); 
const root = createRoot(container); 

// Tell React to Render app in the root Dom element
root.render(<MyFlixApplication />); 

