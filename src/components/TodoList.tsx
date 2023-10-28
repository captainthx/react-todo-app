import { List, Card, Tag } from "antd";
import { todosItem } from "../typ";
import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";

interface TodoListProps {
  taskList: todosItem[];
}

const deleteTask = (id: number) => {
  const todos = JSON.parse(localStorage.getItem("todos") || "[]");
  todos.splice(id, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  location.reload();
};

const updateTask = (id: number) => {
  const todos = JSON.parse(localStorage.getItem("todos") || "[]");
  todos[id].iscomplete = !todos[id].iscomplete;
  localStorage.setItem("todos", JSON.stringify(todos));
  location.reload();
};

function TodoList(props: TodoListProps) {
  const { taskList } = props;

  return (
    <>
      <h2 style={{ textAlign: "center" }}>todos list</h2>
      <List
        dataSource={taskList}
        renderItem={(item, index) => (
          <Card
            title="Task"
            style={{ width: "300px", marginBottom: "1rem" }}
            actions={[
              <span onClick={() => deleteTask(index)}>
                <DeleteOutlined />
              </span>,
              <span onClick={() => updateTask(index)}>
                <CheckOutlined />,
              </span>,
            ]}
          >
            <p style={{ fontSize: "16px", color: "green" }}>
              content: {item.content}
              <br />
              status:
              <Tag
                style={{ margin: "1rem" }}
                color={item.iscomplete ? "green" : "red"}
              >
                {item.iscomplete ? "Complete" : "Incomplete"}
              </Tag>
            </p>
          </Card>
        )}
      />
    </>
  );
}

export default TodoList;
