"use client";

import Profile, { ProfilePreload } from "@/components/sub-components/Profile";
import { SMKFinishedProfiles, SMKProfile } from "@/global/types";
import { getAllProfiles } from "@/lib/apis/SleepMarryKillApi";
import "@/styles/sleep-marry-kill.css";
import Image from "next/image";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";

export default function Page() {
  const [profiles, setProfiles] = useState<SMKProfile[]>([]);
  const [index, setIndex] = useState<number>(0);
  const [selectedSleep, setSelectedSleep] = useState<number>();
  const [selectedMarry, setSelectedMarry] = useState<number>();
  const [selectedKill, setSelectedKill] = useState<number>();
  const [selectionFinished, setSelectionFinished] = useState<boolean>(false);
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
      }
      const savedIndex = localStorage.getItem("smk-index");
      if (savedIndex) setIndex(parseInt(savedIndex));
    };

    loadProfiles();
  }, []);

  if (profiles.length == 0) return;

  if (profiles.length < (index + 1) * 3) {
    console.log(finishedEntries);
    if (index == 0) return;
    return (
      <>
      <Button label="Reset" onClick={async () => {
        setIndex(0);
        const profiles = await getAllProfiles();
        shuffle(profiles);
        setProfiles(profiles);
        localStorage.setItem("smk-index", 0+"");
        localStorage.setItem("smk-profiles", JSON.stringify(profiles));
      }} />
        <div className="scrolling-image-container">
          <div className="scrolling-image"></div>
        </div>
        <div className="w-full h-full flex items-center">
          <div className="card">
            <div className="profile-container">
              {finishedEntries.map((entry) => {
                const getPath = (profile: SMKProfile, isDeath: boolean) =>
                  isDeath && profile.deathImageEnding
                    ? "/" + profile.path + "/" + profile.name + "_X." + profile.deathImageEnding
                    : "/" + profile.path + "/" + profile.name + "." + profile.ending;
                return (
                  <>
                    <div className="profile">
                      <div className="image-container">
                        <Image src={getPath(entry.sleep, false)} width={450} height={450} alt="" className="image" />
                      </div>
                    </div>
                    <div className="profile">
                      <div className="image-container">
                        <Image src={getPath(entry.marry, false)} width={450} height={450} alt="" className="image" />
                      </div>
                    </div>
                    <div className="profile">
                      <div className="image-container">
                        <Image src={getPath(entry.kill, true)} width={450} height={450} alt="" className="image" />
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }

  const onClick = async () => {
    setSelectionFinished(true);
    if (
      profiles[index * 3].deathImageEnding ||
      profiles[index * 3 + 1].deathImageEnding ||
      profiles[index * 3 + 2].deathImageEnding
    ) {
      await new Promise((r) => setTimeout(r, 2000));
    }
    const newEntry: SMKFinishedProfiles = {
      sleep: profiles[index * 3 + selectedSleep!],
      marry: profiles[index * 3 + selectedMarry!],
      kill: profiles[index * 3 + selectedKill!],
    };
    finishedEntries[index] = newEntry;
    setFinishedEntries(finishedEntries);
    setIndex(index + 1);
    localStorage.setItem("smk-index", index + 1 + "");
    setSelectionFinished(false);
    setSelectedSleep(undefined);
    setSelectedMarry(undefined);
    setSelectedKill(undefined);
  };

  // TODO: Move to useEffect
  return (
    <>
      <div className="scrolling-image-container">
        <div className="scrolling-image" />
      </div>
      <div className="w-full h-full flex items-center">
        <ProfilePreload profiles={profiles} />
        <div className="card">
          <div className="profile-container">
            <Profile
              profile={profiles[index * 3]}
              sleep={[selectedSleep, setSelectedSleep]}
              marry={[selectedMarry, setSelectedMarry]}
              kill={[selectedKill, setSelectedKill]}
              selectionFinished={selectionFinished}
              key={index + "-" + 0}
              index={0}
            />
            <Profile
              profile={profiles[index * 3 + 1]}
              sleep={[selectedSleep, setSelectedSleep]}
              marry={[selectedMarry, setSelectedMarry]}
              kill={[selectedKill, setSelectedKill]}
              selectionFinished={selectionFinished}
              key={index + "-" + 1}
              index={1}
            />
            <Profile
              profile={profiles[index * 3 + 2]}
              sleep={[selectedSleep, setSelectedSleep]}
              marry={[selectedMarry, setSelectedMarry]}
              kill={[selectedKill, setSelectedKill]}
              selectionFinished={selectionFinished}
              key={index + "-" + 2}
              index={2}
            />
          </div>
          <div className="flex">
            <Button
              className="confirm"
              label="Confirm"
              onClick={onClick}
              disabled={!(selectedSleep != undefined && selectedKill != undefined && selectedMarry != undefined)}
            />
          </div>
        </div>
      </div>
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
