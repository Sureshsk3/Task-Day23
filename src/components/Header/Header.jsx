import React, { useEffect, useState } from "react";
import "./../Header/header.css";
import Button from "react-bootstrap/Button";
import { findIndexById } from "./../utils/Value";

function Header({
  items,
  setItems,
  name,
  status,
  setTitle,
  description,
  setDescription,
  setStatus,
}) {
  const [out, SetOut] = useState();
  const [filter, setfilter] = useState([]);
  useEffect(()=>{
    setfilter(items)
  },[items])
  const handleSubmit = () => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const data = {
      id,
      description,
      name,
      status:false
    };

    console.log(data);
    let newArr = [...items];
    newArr.push(data);
    setItems(newArr);
    setTitle("");
    setDescription("");
  };
  const handleDelete = (id) => {
    let index = findIndexById(items, id);
    if (id !== -1) {
      let newArr = [...items];
      newArr.splice(index, 1);
      setItems(newArr);
    }
  };

  const handleEdit = (id) => {
    let selectId = id;
    SetOut(selectId);
    let index = findIndexById(items, Number(id));
    if (index !== -1) {
      setTitle(items[index].name);
      setDescription(items[index].description);
      setStatus(true);
    } else {
      console.error("Invaild Id");
    }
  };

  const handleEditBtn = () => {
    if (name && description) {
      let index = findIndexById(items, out);
      let data = {
        id: items[index].id,
        name,
        description,
        status: true,
      };

      let newArr = [...items];
      newArr.splice(index, 1, data);
      setItems(newArr);
      setTitle("");
      setDescription("");
      setStatus("");
    } else {
      console.error("invalid input's");
    }
  };
  const handleFilterData = (value1) => {
   
    if(value1=="All"){
      setfilter(items)
    }else{
      const value = items.filter((item) => {
        return item.status == (value1=="Completed");
       });
       setfilter(value)
    }
  };
  return (
    <>
      <div>
        <h2 className="text-success text-center">My todo</h2>
        <header className="container input-box ">
          <input
            type="text"
            className="text-center input"
            id="inputGroup-sizing"
            placeholder="Enter Your Task Name"
            value={name}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            className="text-center input"
            id="inputGroup-sizing-default"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {name && description && status === true ? (
            <button
              className="btn-input btn btn-info"
              onClick={() => handleEditBtn()}
            >
              Edit ToDo
            </button>
          ) : (
            <button
              className="btn-input btn btn-success"
              onClick={() => handleSubmit()}
            >
              Add ToDo
            </button>
          )}
        </header>
      </div>
      <div>
        <div className="mt-5 nav-box container">
          <h3 className="">My Todos</h3>
          <div className="btn-group">
            <span>Status Filter :</span>
            <div>
              <select
                id="dropDown"
                className="btn btn-dark dropdown-toggle dropdown-btn"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onChange={(e) => handleFilterData(e.target.value)}
              >
                <option className="dropdown-item" value="All">
                  All
                </option>
                <option className="dropdown-item" value="Completed">
                  Completed
                </option>
                <option className="dropdown-item" value="Not-Completed">
                  Not-Completed
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div>
        <section className="box-todo mt-5 container">
          {filter.map((e) => {
            return (
              <div key={e.id}>
                <div className="child-box">
                  <h4>Task Name : {e.name} </h4>
                  <p>Description : {e.description} </p>
                  <span>Status : </span>&nbsp;
                  <select
                    className={e.status ? "btn btn-success" : "btn btn-danger"}
                  >
                    <option>
                      {e.status === true ? "Completed" : "Not Completed"}
                    </option>{" "}
                    :
                    <option>
                      {e.status === false ? "Completed" : "Not Completed"}
                    </option>
                  </select>
                  <section className="btnAll">
                    <Button
                      variant="dark dlt-edt-btn"
                      onClick={() => handleEdit(e.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="info dlt-edt-btn"
                      onClick={() => handleDelete(e.id)}
                    >
                      Delete
                    </Button>
                  </section>
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </>
  );
}

export default Header;
