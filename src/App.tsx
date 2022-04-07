import {useState} from "react";
import {ClassModelContextProvider} from "./components/ClassModelContext";
import {ClassModelInput} from "./components/ClassModelInput";
import {ClassModelOutput} from "./components/ClassModelOutput";
import {defaultModel} from "./domain/create";

function App() {
  return (
    <ClassModelContextProvider>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "2rem",
        }}
      >
        <h1>DomainClassGenerator</h1>
        <div style={{display: "flex", flexDirection: "column"}}>
          <ClassModelInput />
          <ClassModelOutput />
        </div>
      </div>
    </ClassModelContextProvider>
  );
}

export default App;
