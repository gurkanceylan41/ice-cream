import axios from "axios";
import { useEffect, useState } from "react";
import { getAllByTestId } from "@testing-library/react";

const Toppings = () => {
  const [data, setData] = useState([]);
  const [basket, setBasket] = useState([]);

  const handleChange = (item) => {
    const found = basket.find((i) => i.id === item.id);

    found
      ? setBasket(basket.filter((i) => i.id !== item.id))
      : setBasket([...basket, item]);
  };

  useEffect(() => {
    axios
      .get("http://localhost:4090/toppings")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div>
      <h1>Sos Çeşitleri</h1>
      <p>
        Tanesi <span className="text-success">3</span>₺
      </p>

      <h3>
        Soslar Ücreti
        <span data-testid="total" className=" text-success">
          {basket.length * 3}
        </span>
        ₺
      </h3>

      <div className="row p-3 mt-4 gap-3">
        {data.map((i) => {
          const found = basket.find((item) => item.id === i.id);
          return (
            <div
              data-testid="card"
              onClick={() => handleChange(i)}
              key={i.id}
              className={`top-card col ${found ? "active" : ""}`}
            >
              <img src={i.imagePath} height={100} />
              <p> {i.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Toppings;
