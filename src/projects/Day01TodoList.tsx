import { useState } from "react";

type Item = {
  id: string;
  text: string;
  status: "completed" | "active";
};

export function Day01TodoList() {
  const [list, setList] = useState<Item[]>(() => {
    const storeData = localStorage.getItem("todoList");
    return storeData ? (JSON.parse(storeData) as Item[]) : [];
  });
  const [tab, setTab] = useState("all");
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      addItem(inputValue);
      setInputValue("");
    }
  };
  const addItem = (input: string) => {
    const newItem: Item = {
      id: crypto.randomUUID(),
      text: input,
      status: "active",
    };
    const newList = [...list, newItem];
    setList(newList);
    localStorage.setItem("todoList", JSON.stringify(newList));
  };
  const deleteItem = (id: string) => {
    const newData: Item[] = list.filter((item) => item.id !== id);
    setList(newData);
    localStorage.setItem("todoList", JSON.stringify(newData));
  };

  const toggleItem = (id: string) => {
    const newData: Item[] = list.map((item) => {
      if (item.id === id)
        return {
          ...item,
          status: item.status === "active" ? "completed" : "active",
        };
      return item;
    });
    setList(newData);
    localStorage.setItem("todoList", JSON.stringify(newData));
  };
  const filterData = (): Item[] => {
    if (tab === "all") return list;
    return list.filter((item) => item.status === tab);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" disabled={inputValue.trim() === ""}>
          新增
        </button>
      </form>
      <div className="flex gap-1">
        <button onClick={() => setTab("all")}>全部</button>
        <button onClick={() => setTab("active")}>進行中</button>
        <button onClick={() => setTab("completed")}>已完成</button>
      </div>
      <div>
        <ul>
          {filterData().map((item) => (
            <li key={item.id} style={{ display: "flex", gap: "1rem" }}>
              <div
                onClick={() => toggleItem(item.id)}
                style={{
                  textDecoration:
                    item.status === "completed" ? "line-through" : "none",
                }}
              >
                {item.text}
              </div>
              <button onClick={() => deleteItem(item.id)}>刪除</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
