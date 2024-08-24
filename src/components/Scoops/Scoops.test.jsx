/* 
!Seçiciler

1) Method tipi | 2) All ifadesi | 3) Seçici Method

* get > render anında DOM'da olan elementleri almak için kullanılır, elementi bulamazsa test başarısız olur

* query > get ile aynı işlevi görür sadece hata göndermez test devam eder.

* find >elementin ekrana basılmasının asenkron olduğu durumlarda kullanılır (api isteği sonucu ekrana basılıcaksa)


* eğer seçici methoda all ifadesi eklersek seçici koşula uyan bütün elemanları getirir
*not: All kullanılırsa dönen cevapta 1 eleman olsa dahi dizi olarak döner.


*/

import { findAllByRole, render, screen } from "@testing-library/react";
import Scoops from ".";
import userEvent from "@testing-library/user-event";

test("API'Dan alınan veriler için ekrana kartlar basılır ", async () => {
  // Test edilecek bileşeni renderla
  render(<Scoops />);

  // Test edilcek elementleri çağır
  const images = await screen.findAllByAltText("çeşit-resim");

  // Ekrandaki resimlerin (kartların) sayısı 1 den fazla mı ?
  expect(images.length).toBeGreaterThanOrEqual(1);
});

test("Çeşitlerin ekleme ve azaltma işlevlerinin toplam fiyata etkisi", async () => {
  // test edilecek bileşen render edilir

  const user = userEvent.setup();

  render(<Scoops />);

  // bütün ekleme ve azaltma butonlarını çağır
  const addBtns = await screen.findAllByRole("button", { name: "Ekle" });
  const deleteBtns = await screen.findAllByRole("button", { name: "Azalt" });

  // toplam fiyat elementini çağır
  const total = screen.getByTestId("total");

  // baslangıc anında toplam fiyat 0 mı kontrol et
  expect(total).toHaveTextContent(/^0$/);

  // chocolate'in ekle butonuna tıkla
  await user.click(addBtns[2]);

  // toplam fiyat 20 mi kontrol et
  expect(total).toHaveTextContent(/^20$/);

  // vanilla'nın ekle butonuna çift tıkla
  await user.dblClick(addBtns[1]);

  // toplam fiyat 60 mı kontrol et
  expect(total).toHaveTextContent(/^60$/);

  //vanilla'nın azalt butonuna tıkla
  await user.click(deleteBtns[1]);

  // toplam fiyat 40 mı kontrol et
  expect(total).toHaveTextContent(/^40$/);

  //vanilla'nın azalt butonuna tıkla
  await user.click(deleteBtns[1]);

  // toplam fiyat 20 mı kontrol et
  expect(total).toHaveTextContent(/^20$/);

  // chocolate'in azlat butonuna tıkla
  await user.click(deleteBtns[2]);

  // toplam fiyat 0 mı kontrol et
  expect(total).toHaveTextContent(/^0$/);
});
