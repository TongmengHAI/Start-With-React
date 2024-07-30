/* eslint-disable react/prop-types */
import { Alert, Button, Input, Modal, Select, Space, Table } from "antd";
import React, { createContext, memo, useState } from "react";
import "./Todo.scss";
import { EditOutlined, RestOutlined } from "@ant-design/icons";

function TodoTableList({ todoList, onChangeStatus, onDelete, onEdit, onAlert, filterId }) {
  const [todo, setTodo] = useState({ task: "" });

  const ReachableContext = createContext(null);
  const config = {
    title: "Delete Task!",
    content: (
      <>
        <ReachableContext.Consumer>
          {(name) => ` ${name}!`}
        </ReachableContext.Consumer>
        <br />
      </>
    ),
  };
  const [modal, contextHolder] = Modal.useModal();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  
  const handleOk = (index) => {
    onEdit(index, todo.task);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [statusColor, setStatusColor] = useState([
    { key: 0, color: "pending" },
    { key: 1, color: "progress" },
    { key: 2, color: "done" },
  ]);
  const [status, setStatus] = useState([
    { key: 0, value: "Pending" },
    { key: 1, value: "In Progress" },
    { key: 2, value: "Done" },
  ]);
  const changeColor = (record, _) => {
    return statusColor[record.status].color;
  };


  const columns = [
    {
      title: "Task",
      dataIndex: "task",
      key: "task",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",

      render: (_, record, __) => (
        <Space wrap size={"middle"}>
          <Select
            defaultValue={status[record.status].value}
            value={status[record.status].value}
            onChange={(value) => onChangeStatus(record.key, value)}
            style={{
              width: 120,
            }}
            options={[
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
      ),
    },
    {
      title: "Actions",
      // dataIndex: "task",
      key: "actions",
      render: (_, record, ___) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            <ReachableContext.Provider value="Do you really want to delete?">
              <Space>
                <Button
                  type="primary"
                  danger
                  onClick={async () => {
                    const confirmed = await modal.confirm(config);
                    confirmed ? onDelete(record.key) : null;
                  }}
                >
                  <RestOutlined />
                </Button>
              </Space>
              {/* `contextHolder` should always be placed under the context you want to access */}
              {contextHolder}

              {/* Can not access this context since `contextHolder` is not in it */}
            </ReachableContext.Provider>
            <Button
              type="primary"
              onClick={() => {
                showModal(), setTodo(todoList[record.key]);
              }}
              style={{ backgroundColor: "green" }}
            >
              <EditOutlined />
            </Button>
            <Modal
              title="Update Task"
              open={isModalOpen}
              onOk={() => {
                handleOk(record.key), onAlert(0.5);
              }}
              onCancel={handleCancel}
            >
              <div style={{ display: "flex", gap: "10px" }}>
                <label htmlFor="updateTask">Task </label>
                <Input
                  id="updateTask"
                  value={todo.task}
                  onChange={(e) => setTodo({ ...todo, task: e.target.value })}
                ></Input>
              </div>
            </Modal>
          </div>
        );
      },
    },
  ];
  const addTodoListKey = todoList?.map((item, index) => ({ ...item, key: index }));
  const dataFilter = filterId === -1 ? addTodoListKey : addTodoListKey.filter((item) => item.status === filterId);

  return (
    <div>
      <Table
        style={{ minWidth: "300px" }}
        bordered
        pagination={false}
        columns={columns}
        dataSource={dataFilter}
        rowClassName={(record, index) => changeColor(record, index)}
      />
      
    </div>
  );
}
export default memo(TodoTableList);
