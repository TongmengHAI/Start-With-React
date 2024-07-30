import React, { useEffect, useState } from "react";
import { useImmer } from "use-immer";
import UseEffect from "../react-hook/use-effect/UseEffect";

import SeeMore from "./SeeMore";


export default function UpdateObjectState() {
  // using useImmer to update state value in real time
  const [employee, updateEmployee] = useImmer({
    name: "Jong",
    age: 24,
    info: {
      department: "IT",
      salary: "1000",
    },
  });

  // using onChange function with spread operator to update state value in real time
  let initialValue = {
    name: "",
    info: {
      price: "",
      descriptions: "lorem ipsum dolor sit amet.",
    },
  }
  const [person, setPerson] = useState(initialValue);
  const [listPerson, setListPerson] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [onSeeMore, seOnSeeMore] = useState(false);
  const [counter, setCounter] = useState(0);
  let count = 0;
  let findIndex = 0;

  const onDelete = (index) => {
    setListPerson((prev) => prev.filter((_, i) => i !== index));
  };

  const onEdit = (index) => {
    findIndex = index;
    setPerson(listPerson[index]);
  };

  useEffect(() => {
    const refreshIntervalId = setInterval(() => {
      // setCount(count+1);
      count++;
      setCounter(count);
      if (count >= 6) {
        clearInterval(refreshIntervalId);
      }
    }, 1000);

    // Cleanup function to clear the interval on unmount
    return () => clearInterval(refreshIntervalId);

  }, []); 


  // console.log(onSeeMore)
  // console.log(person);
  // console.log(employee);
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px'}}>
      <UseEffect contentModal="Welcome to use effect mount"/>

      {/* <div className="employee">
        <h2>Employee</h2>
        <div className="name">
          <label htmlFor="name">Name </label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={employee.name}
            onChange={(e) =>
              updateEmployee((draft) => {
                draft.name = e.target.value;
              })
            }
          />
        </div>
        <div className="age">
          <label htmlFor="age">Age </label>
          <input
            type="number"
            name="age"
            placeholder="age"
            value={employee.age}
            onChange={(e) =>
              updateEmployee((draft) => {
                draft.age = e.target.value;
              })
            }
          />
        </div>
        <div className="department">
          <label htmlFor="department">Department </label>
          <input
            type="text"
            name="department"
            placeholder="department"
            value={employee.info.department}
            onChange={(e) =>
              updateEmployee((draft) => {
                draft.info.department = e.target.value;
              })
            }
          />
        </div>
        <div className="salary">
          <label htmlFor="salary">Salary </label>
          <input
            type="text"
            name="salary"
            placeholder="salary"
            value={employee.info.salary}
            onChange={(e) =>
              updateEmployee((draft) => {
                draft.info.salary = e.target.value;
              })
            }
          />
        </div>
      </div> */}
      <div className="timer align-right">
        <h2>Timer</h2>
        <p style={{border: '2px solid black', padding: '10px', fontSize: '30px', width: '100px',height: '200px',display: 'flex', justifyContent: 'center', alignItems: 'center',color: counter>=6?'red':'gold'}}>{counter>=6?"❌":counter+' s'	}</p>
      </div>
      <hr />
      <div className="person" style={{textAlign: 'right'}}>
        <h2>Product</h2>
        <div className="name" >
          <label htmlFor="name">Name </label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={person.name}
            onChange={(e) => setPerson({ ...person, name: e.target.value })}
          />
        </div>
        
        <div className="price">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            name="price"
            placeholder="price"
            value={person.info.price}
            onChange={(e) =>
              setPerson({
                ...person,
                info: { ...person.info, price: e.target.value },
              })
            }
          />
        </div>
        <div className="descriptions">
          <label htmlFor="descriptions">Descriptions</label>
          <textarea
            name="descriptions"
            placeholder="descriptions"
            value={person.info.descriptions}
            onChange={(e) =>
              setPerson({
                ...person,
                info: { ...person.info, descriptions: e.target.value },
              })
            }
          />
        </div>

        <button
          onClick={() => {
            isEdit ?  listPerson[findIndex] = person : setListPerson([...listPerson, person]);
            isEdit? setIsEdit(!isEdit):setIsEdit(isEdit);
            setPerson(initialValue);
          }}
        >
          {isEdit ? "Edit" : "Add"}
        </button>
      </div>

      <hr/>

      <div style={{textAlign: 'left'}}>
        <h2>Product List</h2>

        <table border="1" >
          <thead>
            <tr style={{textAlign: 'center'}}>
              <th>No</th>
              <th>Name</th>
              <th>Price</th>
              <th>Descriptions</th>
              <th>Action</th>

            </tr>
          </thead>
          <tbody>
            {listPerson.map((item, index) => (
              <tr key={index} style={{textAlign: 'center'}}>
                <td style={{width: '30px'}}>{index+1}</td>
                <td style={{width: '100px'}}>{item.name}</td>
                <td style={{width: '100px'}}>{item.info.price}</td>
                <td style={{width: '200px'}}>{item.info.descriptions}{onSeeMore?<SeeMore/>:""} <span style={{ color: !onSeeMore? 'skyblue': 'grey', cursor: 'pointer'}} onClick={() =>{seOnSeeMore(!onSeeMore)}}>{!onSeeMore?"see more..":"see less"}</span></td>
                <td>
                  <button onClick={() => onDelete(index)} style={{backgroundColor: 'red'}}>Delete</button>
                  <button onClick={() => {onEdit(index), setIsEdit(true)}}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>


      
  );
}
