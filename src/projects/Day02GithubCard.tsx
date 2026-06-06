import { useFetch } from "@/hooks";
import { useRef, useState } from "react";

type User = {
  login: string;
  avatar_url: string;
  bio: string;
  followers: number;
  public_repos: number;
};

export function Day02GithubCard() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState<string>("");
  const [history, setHistory] = useState<Set<string>>(new Set());

  const { data: user, isLoading, error } = useFetch<User>(url);

  const setUserName = (username: string) => {
    setUrl(`https://api.github.com/users/${username}`);
    setHistory((prev) => new Set(prev).add(username));
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = inputRef.current?.value.trim();
    if (!inputRef.current || !username) return;
    setUserName(username);
    inputRef.current.value = "";
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "2rem",
      }}
    >
      <form onSubmit={handleSubmit}>
        <input type="text" ref={inputRef} />
        <button type="submit">搜尋</button>
      </form>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        {[...history].map((item) => (
          <li key={item}>
            <button onClick={() => setUserName(item)}>{item}</button>
          </li>
        ))}
      </ul>
      {user === null && !isLoading && error === null ? null : isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : user ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
            backgroundColor: "var(--code-bg)",
            padding: "1rem",
            borderRadius: "0.5rem",
            minWidth: "50vw",
            color: "var(--code-color)",
          }}
        >
          <div
            style={{
              width: "10rem",
              aspectRatio: "1/1",
              overflow: "hidden",
              borderRadius: "calc(infinity * 1px)",
            }}
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              width="100%"
              height="100%"
            />
          </div>
          <div>{user.login}</div>
          <div>
            <span>bio</span>
            {user.bio}
          </div>
          <div>
            <span>followers</span>
            {user.followers}
          </div>
          <div>
            <span>public repos</span>
            {user.public_repos}
          </div>
        </div>
      ) : null}
    </div>
  );
}
