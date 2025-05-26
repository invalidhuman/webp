import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  //   const [item, setItem] = useState("");

  const btnHandler = () => {
    axios
      .get("/api/getTodos")
      .then((response) => {
        console.log("api 응답(data) : ", response.data.data);
        setData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);

        setData([]);
      });
  };

  useEffect(() => {
    console.log("data 변경됨: ", data);
  }, [data]);

  return (
    <>
      <button onClick={btnHandler} className="border-2 bg-amber-400 px-2 py-2">
        api 요청
      </button>
      <div>
        <span></span>
        <ol>
          {data.map(({ id, title }) => (
            <li key={id}>{title}</li>
          ))}
        </ol>
      </div>
    </>
  );
}

export default App;
