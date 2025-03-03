"use client";

import EndScreen from "@/components/EndScreen";
import NormalScreen from "@/components/NormalScreen";
import { SMKFinishedProfiles, SMKProfile } from "@/global/types";
import { getAllProfiles } from "@/lib/apis/SleepMarryKillApi";
import "@/styles/sleep-marry-kill.css";
import { useEffect, useState } from "react";

export default function Page() {
  const [profiles, setProfiles] = useState<SMKProfile[]>([]);
  const [index, setIndex] = useState<number>(0);
  const [finishedEntries, setFinishedEntries] = useState<SMKFinishedProfiles[]>([]);

  useEffect(() => {
    const loadProfiles = async () => {
      const savedProfiles = localStorage.getItem("smk-profiles");
      if (!savedProfiles) {
        const profiles = await getAllProfiles();
        shuffle(profiles);
        setProfiles(profiles);
        localStorage.setItem("smk-profiles", JSON.stringify(profiles));
      } else {
        setProfiles(await JSON.parse(savedProfiles));
        const finishedEntries = localStorage.getItem("smk-finished");
        if(finishedEntries) {
          setFinishedEntries(await JSON.parse(finishedEntries));
        }
      }
      const savedIndex = localStorage.getItem("smk-index");
      if (savedIndex) setIndex(parseInt(savedIndex));
    };

    loadProfiles();
  }, []);

  if (profiles.length == 0) return;

  const reset = async () => {
    setIndex(0);
    const profiles = await getAllProfiles();
    shuffle(profiles);
    setProfiles(profiles);
    setFinishedEntries([]);
    localStorage.setItem("smk-index", 0 + "");
    localStorage.setItem("smk-profiles", JSON.stringify(profiles));
    localStorage.removeItem("smk-finished");
  };

  if (profiles.length < (index + 1) * 3) {
    if (index == 0) return;

    return <EndScreen reset={reset} finishedEntries={finishedEntries} />;
  }

  // TODO: Move to useEffect
  return (
    <>
      <NormalScreen
        reset={reset}
        profiles={profiles}
        index={index}
        setIndex={setIndex}
        finishedEntries={finishedEntries}
        setFinishedEntries={setFinishedEntries}
      />
      <a className="bonus-sinnlos" href="/bonus-sinnlos" />
    </>
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
