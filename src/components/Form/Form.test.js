import { fireEvent, render, screen } from "@testing-library/react";
import Form from "./index";

it("Koşulların onay durumuna göre buton aktifliği", () => {
  // Render edilicek bileşeni çağır
  render(<Form />);

  // test edilicek elementi çağır
  const button = screen.getByRole("button");
  const checkbox = screen.getByRole("checkbox");

  // checkbox tiklenmemiştir
  expect(checkbox).not.toBeChecked();
  //button inaktif
  expect(button).toBeDisabled();
  // checkbox tikli
  fireEvent.click(checkbox);
  // button  aktif
  expect(button).toBeEnabled();
  // checkbox tikle
  fireEvent.click(checkbox);
  // button inaktif
  expect(button).toBeDisabled();
});

test("butonun hover olmasına göre bildirim ekrana gelir", () => {
  // Render edilcek bileşeni çağır
  render(<Form />);

  // test edilicek elementleri çağır
  const button = screen.getByRole("button");
  const checkbox = screen.getByRole("checkbox");
  const alert = screen.getByText(/size gerçekten/i);

  // bildirim ekranda gözükmüyor
  expect(alert).not.toBeVisible();

  // checkboxı tikle
  fireEvent.click(checkbox);

  // mouse'u butonun üzerine getir(hover)
  fireEvent.mouseEnter(button);

  // bildirim ekranda var mı
  expect(alert).toBeVisible();

  // mouse'u butondan çek
  fireEvent.mouseLeave(button);

  // bildirim ekranda gözükmüyor
  expect(alert).not.toBeVisible();
});
