import React, { useCallback, useState } from "react";
import "./Todo.scss";
import { Alert, Button, Input, Select, Space } from "antd";
import { MoonFilled, SunFilled } from "@ant-design/icons";
import TodoTableList from "./TodoTableList";

export default function Todo() {
  const [mode, setMode] = useState("white");

  let initialValue = {
    task: "",
    key: "",
    status: 0, // set status as " 0: pending " by default 
  };

  const [todo, setTodo] = useState(initialValue);
  const [todoList, setTodoList] = useState([]);
  const [filterId, setFilterId] = useState(-1);


  const [alertMsg, setAlertMsg] = useState('none');

  const handleAlert = (second) => {
    
    setTimeout(() => {

      let alertTmp = "";

      alertMsg=== "none" ? setAlertMsg('block') : setAlertMsg('none');
      alertTmp = alertMsg;
  
      setTimeout(() => {
        setAlertMsg(alertTmp);
      },3*second*1000)      

    }, second*1000);
  };
  const handleAlertCallback = useCallback(handleAlert,[alertMsg])

  const handleFilter = (value) => {
    console.log(`selected_ ${value}`);
    setFilterId(value);
    
  };
  
  const handleModeChange = () => {
    setMode(mode === "white" ? "black" : "white");
  };
  function handleStatusChange(index, status){
    let newStatus = [...todoList];
    newStatus[index].status = status;
    setTodoList(newStatus);
  }
  const handleStatusChangeCallback  = useCallback(handleStatusChange,[todoList])
  
  function handleDelete(index) {
    let newTodoList= todoList?.filter((_, i) => i !== index);
    setTodoList(newTodoList);
    console.log('delete_'+index)
  }
  const handleDeleteCallback = useCallback(handleDelete,[todoList])

  function handleEdit(index,task){
    todoList[index].task = task
  }
  const handleEditCallback = useCallback(handleEdit,[todoList])

  return (
    <div
      className="container"
      style={{
        backgroundColor: mode,
        color: mode == "white" ? "black" : "white",
      }}
    >
      <h1>Todo List</h1>
      <br />
      <br />
      <div className="header">
        <Button onClick={handleModeChange} style={{ backgroundColor: "#cccccc7e"}}>
          <MoonFilled
            style={{
              display: mode == "white" ? "none" : "block",
              color: "skyBlue",
              fontSize: "20px",
            }}
          />
          <SunFilled
            style={{
              display: mode == "black" ? "none" : "block",
              color: "gold",
              fontSize: "20px",
            }}
          />
        </Button>
        <Space wrap>
          <span>Filter</span>
          <Select
            defaultValue="All"
            style={{
              width: 120,
            }}
            onChange={handleFilter}
            options={[
              { 
                value: -1,
                label: "All",
              },
              {
                value: 0,
                label: "Pending",
              },
              {
                value: 1,
                label: "In Progress",
              },
              {
                value: 2,
                label: "Done",
              },
            ]}
          />
        </Space>
      </div>

      <br />
      <div className="todo">
        <div className="addTodo">
          <Input
            placeholder="Enter Task"
            value={todo.task}
            onChange={(e) => {
              setTodo({ ...todo, task: e.target.value, key: e.target.value+'-'+Date.now() });
            }}
          />
          <Button
            type="primary"
            onClick={() => {
              setTodoList([...todoList, todo]);
              setTodo(initialValue);

            }}
          >
            Add
          </Button>
        </div>

        <div className="List">
          <TodoTableList todoList={todoList} onChangeStatus={handleStatusChangeCallback} onDelete={handleDeleteCallback} onEdit={handleEditCallback} onAlert={handleAlertCallback} filterId={filterId}></TodoTableList>
        </div>
      </div>
      <div className="alert" style={{position:'fixed',bottom:'10px',right:'10px',display:alertMsg}}>
        <Alert
          closable={true}
          message={`Updated successfully`}
          type="success"
          showIcon
        />
      </div>
    </div>
  );
}
