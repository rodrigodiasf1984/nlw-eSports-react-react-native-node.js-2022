import { useEffect, useState } from "react";
import axios from "axios";

import { CreateAdModal } from "./components/CreateAdModal";
import { GameModal } from "./components/GameModal";
import { ToastContainer } from "react-toastify";

import logoImg from "./assets/logo-nlw-esports.svg";
import "./styles/main.css";
import "react-toastify/dist/ReactToastify.css";

export interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios("http://localhost:3333/games").then((response) => {
      setGames(response.data);
    });
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <ToastContainer theme="dark" />
      <img src={logoImg} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>{" "}
        está aqui.
      </h1>
      <GameModal />
      <CreateAdModal />
    </div>
  );
}

export default App;
