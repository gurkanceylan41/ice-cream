import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../Card/index";

const Scoops = () => {
  const [basket, setBasket] = useState([]);
  const [data, setData] = useState([]);
  console.log(basket);

  const total = basket.reduce((total, i) => total + i.amount * 20, 0);

  useEffect(() => {
    axios
      .get("http://localhost:4090/scoops")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err.message));
  }, []);

  const addToBasket = (item) => {
    // Elemanı sepette bul
    const found = basket.find((i) => i.id === item.id);

    // Eleman daha önce tıklandıysa bu kod blogu çalışsın
    if (found) {
      // Güncel nesneyi oluştur
      const updated = { ...found, amount: found.amount + 1 };

      // Dizideki eski elemanı güncelle
      const newBasket = basket.map((i) => (i.id === updated.id ? updated : i));

      // State'i güncelle
      setBasket(newBasket);

      // ilk defa tıklanıyorsa bu kod blogu çalışsın
    } else {
      setBasket([...basket, { ...item, amount: 1 }]);
    }
  };

  const removeFromBasket = (id) => {
    // Elemanı sepette bul
    const found = basket.find((i) => i.id === id);

    // Amount 1'den büyükse bu kod blogu çalışsın
    if (found.amount > 1) {
      // Güncel nesneyi oluştur
      const updated = { ...found, amount: found.amount - 1 };

      // Dizideki eski elemanı güncelle
      const temp = basket.map((i) => (i.id === updated.id ? updated : i));

      // State'i güncelle
      setBasket(temp);

      // Amount 1 ise bu kod blogu çalışsın
    } else {
      // Sepetten sil
      setBasket(basket.filter((i) => i.id !== id));
    }
  };

  return (
    <div>
      <div>
        <h1>Dondurma Çeşitleri</h1>
        <p>
          Tanesi
          <span>20</span>₺
        </p>
        <h3>
          Çeşitler Ücreti
          <span data-testid="total" className="text-success">
            {total}
          </span>
          ₺
        </h3>

        <div className="p-3 row  gap-5 mt-4 justify-content-between">
          {data?.map((item) => (
            <Card
              key={item.id}
              item={item}
              basket={basket}
              addToBasket={addToBasket}
              removeFromBasket={removeFromBasket}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Scoops;
