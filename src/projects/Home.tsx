import { Link } from "react-router-dom";

export function Home() {
  const challenges = [
    { id: "day01", title: "Day 01 - 待辦清單 (TodoList)", path: "/day01" },
  ];

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: "600px", margin: "0 auto" }}>
      <h1>
        30 分鐘
      </h1>
      <p style={{ color: "#666" }}>這裡記錄了我每天的 30 分鐘極限程式設計挑戰清單。</p>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {challenges.map((item) => (
          <li
            key={item.id}
            style={{
              margin: "1rem 0",
              padding: "1rem",
              border: "1px solid #ddd",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <Link
              to={item.path}
              style={{
                textDecoration: "none",
                color: "#0066cc",
                fontWeight: "bold",
                fontSize: "1.1rem",
              }}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
