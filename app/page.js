"use client";
import { useEffect, useState } from "react";
import Todo from "../Components/todo";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
export default function Home() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [todoData, setTodoData] = useState([]);
  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api");
      setTodoData(response.data.todos);
      console.log("Todos fetched:", response.data.todos);
    } catch (error) {
      console.error("Fetch Todos Error:", error);
      toast.error("Failed to load todos");
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete("/api", {
        params: {
          mongoId: id,
        },
      });
      toast.success(response.data.msg);
      await fetchTodos();
    } catch (error) {
      console.error("Delete Todo Error:", error);
      toast.error("Failed to delete todo");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((form) => ({ ...form, [name]: value }));
    console.log(formData);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      //api code
      const response = await axios.post("http://localhost:3000/api", formData);
      toast.success(response.data.msg);
      setFormData({
        title: "",
        description: "",
      });
      await fetchTodos();
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };
  return (
    <>
      <ToastContainer position="top-right" theme="dark" />
      <form
        onSubmit={onSubmitHandler}
        className="flex items-start flex-col gap-2 w-[80%] max-w-[600px] mt-24 px-2 mx-auto "
      >
        <input
          onChange={onChangeHandler}
          value={formData.title}
          type="text"
          name="title"
          placeholder="Enter Title"
          className="px-3 py-2 border-2 w-full"
        />
        <textarea
          value={formData.description}
          onChange={onChangeHandler}
          name="description"
          placeholder="Enter Description"
          className="px-3 py-2 border-2 w-full"
        ></textarea>
        <button type="submit" className="bg-orange-600 py-3 px-11 text-white">
          ADD TODO
        </button>
      </form>

      <div className="relative overflow-x-auto mt-24 w-[60%] mx-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 light:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 light:bg-gray-700 light:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {todoData.map((item, index) => {
              return (
                <Todo
                  key={index}
                  id={index}
                  title={item.title}
                  description={item.description}
                  complete={item.isCompleted}
                  mongoId={item._id}
                  deleteTodo={deleteTodo}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
