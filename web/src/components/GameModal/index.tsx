import { Check, DiscordLogo, GameController, X } from "phosphor-react";

import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

import { Input } from "../Form/Input";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { Game } from "../../App";
import { GameBanner } from "../GameBanner";
import { LabelValue } from "../LabelValue";
import { getDayOfWeek } from "../../utils/getDayOfWeek";

interface Ads {
  id: string;
  name: string;
  weekDays: string[];
  useVoiceChannel: boolean;
  yearsPlaying: number;
  hourStart: number;
  hourEnd: number;
  discord?: string;
}

export function GameModal() {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game>();
  const [ads, setAds] = useState<Ads[]>([]);

  const [adSelected, setAdSelected] = useState<string | null>(null);

  useEffect(() => {
    axios("http://localhost:3333/games").then((response) => {
      setGames(response.data);
    });
  }, []);

  function getGameSelectedAds() {
    axios(`http://localhost:3333/games/${selectedGame?.id}/ads`).then(
      (response) => {
        setAds(response.data);
      }
    );
  }
  useEffect(() => {
    getGameSelectedAds();
  }, [selectedGame]);

  useEffect(() => {
    async function getDiscord() {
      await axios
        .get(`http://localhost:3333/ads/${adSelected}/discord`)
        .then((response) => {
          const newAds = ads.map((ad) => {
            if (ad.id === adSelected) {
              ad.discord = response.data.discord;
            }

            return ad;
          });

          setAds(newAds);
          setAdSelected(null);
        });
    }
    if (adSelected) getDiscord();
  }, [adSelected, selectedGame]);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button type="submit">
          <div className="grid grid-cols-6 gap-6 mt-16">
            {games.map((game) => {
              return (
                <button onClick={() => setSelectedGame(game)}>
                  <GameBanner
                    key={game.id}
                    title={game.title}
                    bannerUrl={game.bannerUrl}
                    adsCount={game._count.ads}
                  />
                </button>
              );
            })}
          </div>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
        <Dialog.Content className="w-full h-full md:w-[80%] max-w-5xl md:max-h-[500px]  md:h-[80%] grid md:rounded-md grid-rows-[80px_minmax(100px,_1fr)] m-auto  bg-[#2a2634] shadow-2xl shadow-black/50 fixed py-6 rounded-lg px-6 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex items-start justify-between ">
            <div className="flex flex-col">
              <Dialog.Title className="overflow-hidden text-lg font-black text-transparent sm:text-xl md:text-2xl text-ellipsis bg-nlw-gradient bg-clip-text">
                {selectedGame?.title}
              </Dialog.Title>
              <Dialog.Description className="mb-8 text-sm">
                Conecte-se e comece a jogar!
              </Dialog.Description>
            </div>
            <Dialog.Close>
              <X />
            </Dialog.Close>
          </div>
          <main className="min-h-[100px] grid grid-cols-[1fr]  px-0  md:grid-cols-[1fr_1fr] overflow-auto">
            <div className="flex items-center justify-center  rounded-xl md:overflow-hidden">
              <div className="flex w-full h-full">
                <img src={selectedGame?.bannerUrl} alt={selectedGame?.title} />
              </div>
            </div>
            <div className="md:overflow-auto">
              {ads.length === 0 && (
                <LabelValue label="Nenhum anúncio encontrado">
                  Nenhum jogador interessado nesse jogo no momento
                </LabelValue>
              )}

              {ads.map((ad) => {
                const weekDays = getDayOfWeek(ad.weekDays);
                return (
                  <div
                    key={ad.id}
                    className={"bg-zinc-900 rounded-2xl p-4 m-4"}
                  >
                    <LabelValue label="Name">{ad.name}</LabelValue>

                    <LabelValue label="Discord">
                      <div
                        onClick={() => setAdSelected(ad.id)}
                        className="flex items-center gap-3 hover:cursor-pointer"
                      >
                        <DiscordLogo className="text-blue-300 w-7 h-7" />
                        <div className="text-sm font-light">
                          {ad.discord ?? "clique para visualizar"}
                        </div>
                      </div>
                    </LabelValue>

                    <LabelValue label="Tempo de Jogo">
                      {ad.yearsPlaying > 0
                        ? ad.yearsPlaying + " ano(s)"
                        : "recente"}
                    </LabelValue>
                    <LabelValue label="Disponibilizade">
                      {weekDays.map((weekDay) => (
                        <div>{weekDay}</div>
                      ))}
                      <div className="text-sm font-normal">
                        {ad?.hourStart} - {ad?.hourEnd}
                      </div>
                    </LabelValue>
                    <LabelValue label="Chamada de áudio">
                      <span
                        className={`${
                          ad.useVoiceChannel ? "text-green-700" : "text-red-700"
                        }`}
                      >
                        {ad.useVoiceChannel ? "Sim" : "Não"}
                      </span>
                    </LabelValue>
                  </div>
                );
              })}
            </div>
          </main>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
