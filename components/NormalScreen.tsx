import { SMKFinishedProfiles, SMKProfile } from "@/global/types";
import Profile, { ProfilePreload } from "./sub-components/Profile";
import { useState } from "react";
import { Button } from "primereact/button";

export default function NormalScreen({
  reset,
  profiles,
  index,
  setIndex,
  finishedEntries,
  setFinishedEntries,
}: {
  reset: Function,
  profiles: SMKProfile[];
  index: number;
  setIndex: Function;
  finishedEntries: SMKFinishedProfiles[];
  setFinishedEntries: Function;
}) {
  const [selectedSleep, setSelectedSleep] = useState<number>();
  const [selectedMarry, setSelectedMarry] = useState<number>();
  const [selectedKill, setSelectedKill] = useState<number>();
  const [selectionFinished, setSelectionFinished] = useState<boolean>(false);

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

  return (
    <>
      <Button label="Reset" onClick={() => reset()} className="reset-button" />
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
