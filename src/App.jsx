import React, { useState } from "react";
import Header from "./components/Header/Header";

function App() {
  let [name, setTitle] = useState();
  let [description, setDescription] = useState();
  let [status, setStatus] = useState(false);
  let [items, setItems] = useState([]);
  return (
    <div id="wrapper">
      <Header
        items={items}
        setItems={setItems}
        name={name}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        status={status}
        setStatus={setStatus}
      />
    </div>
  );
}

export default App;
