import { useState } from "react";

type Item = {
  id: string;
  text: string;
  status: "completed" | "active";
};

type Tab = "all" | "active" | "completed";

const STORAGE_KEY = "TODO_LIST_DATA";

export function Day01TodoList() {
  const [list, setList] = useState<Item[]>(() => {
    const storeData = localStorage.getItem(STORAGE_KEY);
    return storeData ? (JSON.parse(storeData) as Item[]) : [];
  });
  const [tab, setTab] = useState<Tab>("all");
  const [inputValue, setInputValue] = useState("");

  const updateListAndSave = (newList: Item[]) => {
    setList(newList);
    localStorage.setItem("TODO_LIST_DATA", JSON.stringify(newList));
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newItem: Item = {
      id: crypto.randomUUID(),
      text: inputValue.trim(),
      status: "active",
    };

    updateListAndSave([...list, newItem]);
    setInputValue("");
  };

  const deleteItem = (id: string) => {
    const newList = list.filter((item) => item.id !== id);
    updateListAndSave(newList);
  };

  const toggleItem = (id: string) => {
    const newList = list.map(
      (item): Item =>
        item.id === id
          ? {
              ...item,
              status: item.status === "active" ? "completed" : "active",
            }
          : item,
    );
    updateListAndSave(newList);
  };
  const filteredList =
    tab === "all" ? list : list.filter((item) => item.status === tab);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" disabled={!inputValue.trim()}>
          新增
        </button>
      </form>
      <div style={{ display: "flex", gap: "1rem" }}>
        <button onClick={() => setTab("all")}>全部</button>
        <button onClick={() => setTab("active")}>進行中</button>
        <button onClick={() => setTab("completed")}>已完成</button>
      </div>
      <div>
        <ul>
          {filteredList.map((item) => (
            <li
              key={item.id}
              style={{
                display: "flex",
                gap: "1rem",
              }}
            >
              <input
                type="checkbox"
                checked={item.status === "completed"}
                onChange={() => toggleItem(item.id)}
              />
              <div
                style={{
                  width: "10rem",
                  textDecorationLine:
                    item.status === "completed" ? "line-through" : "none",
                }}
              >
                {item.text}
              </div>
              <button type="button" onClick={() => deleteItem(item.id)}>
                刪除
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
