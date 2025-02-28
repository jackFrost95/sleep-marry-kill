import { SMKFinishedProfiles, SMKProfile } from "@/global/types";
import Image from "next/image";
import { Button } from "primereact/button";

export default function EndScreen({reset, finishedEntries}: {reset: Function, finishedEntries: SMKFinishedProfiles[]}) {
  if(!finishedEntries || finishedEntries.length == 0) reset();
    return (
          <>
          <Button label="Reset" onClick={() => reset()} />
            <div className="scrolling-image-container">
              <div className="scrolling-image"></div>
            </div>
            <div className="w-full h-full flex items-center">
              <div className="card">
                <div className="profile-container">
                  {finishedEntries.map((entry, index) => {
                    const getPath = (profile: SMKProfile, isDeath: boolean) =>
                      isDeath && profile.deathImageEnding
                        ? "/" + profile.path + "/" + profile.name + "_X." + profile.deathImageEnding
                        : "/" + profile.path + "/" + profile.name + "." + profile.ending;
                    return (
                      <>
                        <div className="profile" key={index+"-1"}>
                          <div className="image-container">
                            <Image src={getPath(entry.sleep, false)} width={450} height={450} alt="" className="image" />
                          </div>
                        </div>
                        <div className="profile" key={index+"-2"}>
                          <div className="image-container">
                            <Image src={getPath(entry.marry, false)} width={450} height={450} alt="" className="image" />
                          </div>
                        </div>
                        <div className="profile" key={index+"-3"}>
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