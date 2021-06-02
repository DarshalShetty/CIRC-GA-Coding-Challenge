import "./App.css";
import ClientTable from "./ClientTable";

function App() {
  return (
    <div className={"container"}>
      <h2>These are the clients that we are currently working with</h2>
      <div>
        <h3>Domain & Application Gateways</h3>
        <ClientTable collabType={"Domain_and_Application"}/>
      </div>
      <div>
          <h3>Campus Gateways</h3>
          <ClientTable collabType={"Campus"}/>
        </div>
    </div>
  );
}

export default App;
