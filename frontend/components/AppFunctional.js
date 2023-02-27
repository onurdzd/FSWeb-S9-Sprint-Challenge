import axios from "axios";
import React, { useEffect, useState } from "react";
// önerilen başlangıç stateleri
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; //  "B" nin bulunduğu indexi

export default function AppFunctional(props) {
  // AŞAĞIDAKİ HELPERLAR SADECE ÖNERİDİR.
  // Bunları silip kendi mantığınızla sıfırdan geliştirebilirsiniz.

  const gridArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const gridArrayKoordinat = [
    { x: 1, y: 1 },
    { x: 2, y: 1 },
    { x: 3, y: 1 },
    { x: 1, y: 2 },
    { x: 2, y: 2 },
    { x: 3, y: 2 },
    { x: 1, y: 3 },
    { x: 2, y: 3 },
    { x: 3, y: 3 },
  ];
  const [indexDeger, setIndexDeger] = useState(initialIndex);
  const [bIndex, useBIndex] = useState(initialIndex);
  const [moveCount, setMoveCount] = useState(initialSteps);
  const [mesaj, setMesaj] = useState(initialMessage);
  const [mail, setMail] = useState(initialEmail);

  const handleMove = (e) => {
    if (e.target.id === "up") {
      if (indexDeger - 3 >= 0) {
        setMesaj("");
        setIndexDeger(indexDeger - 3);
        setMoveCount(moveCount + 1);
      } else {
        setMesaj("Yukarıya gidemezsiniz");
      }
    }
    if (e.target.id === "down") {
      if (indexDeger + 3 <= 8) {
        setMesaj("");
        setIndexDeger(indexDeger + 3);
        setMoveCount(moveCount + 1);
      } else {
        setMesaj("Aşağıya gidemezsiniz");
      }
    }
    if (e.target.id === "left") {
      if (gridArrayKoordinat[indexDeger].x !== 1) {
        setMesaj("");
        setIndexDeger(indexDeger - 1);
        setMoveCount(moveCount + 1);
      } else {
        setMesaj("Sola gidemezsiniz");
      }
    }
    if (e.target.id === "right") {
      if (gridArrayKoordinat[indexDeger].x !== 3) {
        setMesaj("");
        setIndexDeger(indexDeger + 1);
        setMoveCount(moveCount + 1);
      } else {
        setMesaj("Sağa gidemezsiniz");
      }
    }
  };

  const handleReset = () => {
    setMesaj(initialMessage);
    setIndexDeger(initialIndex);
    setMoveCount(0);
    setMail(initialEmail);
  };

  const handleChange = (e) => {
    setMail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      axios
        .post("http://localhost:9000/api/result", {
          x: gridArrayKoordinat[indexDeger].x,
          y: gridArrayKoordinat[indexDeger].y,
          steps: moveCount,
          email: mail,
        })
        .then((response) => {
          console.log("çalıştı", response.data);
          setMesaj(response.data.message);
          setMail(initialEmail)
        }).catch((error)=>{
          setMesaj(error.response.data.message)
        })
  };


  useEffect(() => {
    useBIndex(gridArray[indexDeger]);
  }, [indexDeger]);

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">
          Koordinatlar{" "}
          {"(" +
            gridArrayKoordinat[indexDeger].x +
            "," +
            gridArrayKoordinat[indexDeger].y +
            ")"}
        </h3>
        <h3 id="steps">
          {moveCount + " kere ilerlediniz"
          }
        </h3>
      </div>
      <div id="grid">
        {gridArray.map((idx) => (
          <div key={idx} className={`square${idx === bIndex ? " active" : ""}`}>
            {idx === bIndex ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{mesaj && mesaj}</h3>
      </div>
      <div id="keypad">
        <button onClick={handleMove} id="left">
          SOL
        </button>
        <button onClick={handleMove} id="up">
          YUKARI
        </button>
        <button onClick={handleMove} id="right">
          SAĞ
        </button>
        <button onClick={handleMove} id="down">
          AŞAĞI
        </button>
        <button onClick={handleReset} id="reset">
          reset
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          id="email"
          type="email"
          placeholder="email girin"
          onChange={handleChange}
          value={mail}
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
