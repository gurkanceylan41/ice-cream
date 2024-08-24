import Scoops from "./components/Scoops";
import Form from "./components/Form";
import Toppings from "./components/Toppings";

const App = () => {
  return (
    <div className="d-flex flex-column gap-5 px-3 py-5 min-vh-100 bg-dark text-light">
      <Form />
      <Scoops />
      <Toppings />
    </div>
  );
};

export default App;
