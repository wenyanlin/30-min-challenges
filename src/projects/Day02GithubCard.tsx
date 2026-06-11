import { useFetch } from "@/hooks";
import { useRef, useState } from "react";

type User = {
  login: string;
  avatar_url: string;
  bio: string;
  followers: number;
  public_repos: number;
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
    alignItems: "center",
    gap: "2rem",
  },
  historyList: {
    listStyle: "none",
    padding: 0,
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
    alignItems: "center",
    gap: "0.5rem",
  },
  card: {
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
    backgroundColor: "var(--code-bg, #f4f4f4)",
    padding: "1rem",
    borderRadius: "0.5rem",
    minWidth: "50%",
    color: "var(--code-color, #333)",
  },
  avatarContainer: {
    width: "10rem",
    aspectRatio: "1/1",
    overflow: "hidden",
    borderRadius: "50%",
  },
};

export function Day02GithubCard() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState<string>("");
  const [history, setHistory] = useState<Set<string>>(new Set());

  const { data: user, isLoading, error } = useFetch<User>(url);

  const setUserName = (username: string) => {
    setUrl(`https://api.github.com/users/${username}`);
    setHistory((prev) => {
      const newSet = new Set(prev);
      newSet.delete(username);
      newSet.add(username);
      return newSet;
    });
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = inputRef.current?.value.trim();
    if (!username) return;
    setUserName(username);
    if (inputRef.current) inputRef.current.value = "";
  };
  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={inputRef} />
        <button type="submit">搜尋</button>
      </form>
      {history.size > 0 && (
        <ul style={styles.historyList}>
          {[...history].reverse().map((item) => (
            <li key={item}>
              <button onClick={() => setUserName(item)}>{item}</button>
            </li>
          ))}
        </ul>
      )}

      {/* 避免巢状三元運算 */}
      {isLoading && <p>載入中...</p>}
      {!isLoading && error && <p>Error: {error.message}</p>}
      {!isLoading && !error && user && (
        <div style={styles.card}>
          <div style={styles.avatarContainer}>
            <img
              src={user.avatar_url}
              alt={user.login}
              width="100%"
              height="100%"
            />
          </div>
          <div>{user.login}</div>
          {user.bio && (
            <div>
              <span>{user.bio}</span>
            </div>
          )}
          <div>
            <span>followers：</span>
            <span>{user.followers}</span>
          </div>
          <div>
            <span>public repos：</span>
            <span>{user.public_repos}</span>
          </div>
        </div>
      )}
    </div>
  );
}
