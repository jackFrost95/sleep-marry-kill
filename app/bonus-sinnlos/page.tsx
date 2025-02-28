"use client";

import EndScreen from "@/components/EndScreen";
import NormalScreen from "@/components/NormalScreen";
import { SMKFinishedProfiles, SMKProfile } from "@/global/types";
import { getAllProfiles } from "@/lib/apis/SleepMarryKillApi";
import "@/styles/sleep-marry-kill.css";
import { useState } from "react";
import profiles from "@/public/bonus-sinnlos.json";

export default function Page() {
  const [index, setIndex] = useState<number>(0);
  const [finishedEntries, setFinishedEntries] = useState<SMKFinishedProfiles[]>([]);

  if (profiles.length == 0) return;

  if (profiles.length < (index + 1) * 3) {
    if (index == 0) return;

    const reset = async () => {
      setIndex(0);
      const profiles = await getAllProfiles();
      shuffle(profiles);
      localStorage.setItem("smk-index", 0 + "");
      localStorage.setItem("smk-profiles", JSON.stringify(profiles));
    };

    return <EndScreen reset={reset} finishedEntries={finishedEntries} />;
  }

  // TODO: Move to useEffect
  return (
    <NormalScreen
      profiles={profiles}
      index={index}
      setIndex={setIndex}
      finishedEntries={finishedEntries}
      setFinishedEntries={setFinishedEntries}
    />
  );
}

function shuffle(array: any[]): any[] {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}
