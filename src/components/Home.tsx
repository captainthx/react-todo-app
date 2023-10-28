import { Button, Space, Input, Form } from "antd";
import { useCallback, useEffect, useState } from "react";
import { todosItem } from "../typ";
import TodoList from "../components/TodoList";

function Home() {
  const [data, setData] = useState<string>("");
  const [todos, setTodos] = useState<todosItem[]>([]);

  const [task, setTask] = useState<todosItem[]>();

  const handleOnchange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setData(e.target.value);
    },
    []
  );
  const handleSubmit = () => {
    setTodos([...todos, { iscomplete: false, content: data }]);
    saveTodosList();
  };

  const saveTodosList = () => {
    window.localStorage.setItem("todos", JSON.stringify(todos));
  };

  const getTodosList = () => {
    const todos = window.localStorage.getItem("todos");
    console.log("taskList", todos);
    if (todos) setTask(JSON.parse(todos) as todosItem[]);
  };
  useEffect(() => {
    getTodosList();
  }, []);

  return (
    <Space direction="vertical" style={{ width: "100%" }} align="center">
      <Form.Item label="todo" style={{ marginTop: "10px" }}>
        <Input value={data} onChange={handleOnchange} />
      </Form.Item>
      <Button disabled={!data} type="primary" onClick={handleSubmit}>
        Submit
      </Button>
      <TodoList taskList={task || []} />
    </Space>
  );
}

export default Home;
