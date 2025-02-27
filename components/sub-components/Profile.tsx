import { SMKProfile } from "@/global/types";
import Image from "next/image";
import { Button } from "primereact/button";

export default function Profile({
  profile,
  sleep,
  marry,
  kill,
  selectionFinished,
  index,
}: {
  profile: SMKProfile;
  sleep: [number | undefined, Function];
  marry: [number | undefined, Function];
  kill: [number | undefined, Function];
  selectionFinished: boolean;
  index: number;
}) {
  const removeAll = () => {
    if (sleep[0] == index) sleep[1](undefined);
    if (marry[0] == index) marry[1](undefined);
    if (kill[0] == index) kill[1](undefined);
  };
  const died = selectionFinished && kill[0] == index && !!profile.deathImageEnding;
  const path = died
    ? "/" + profile.path + "/" + profile.name + "_X." + profile.deathImageEnding
    : "/" + profile.path + "/" + profile.name + "." + profile.ending;
  return (
    <>
      <div className="profile">
        <div className="image-container">
          <Image src={path} width={450} height={450} alt="" className="image" />
        </div>
        <p className="name">{profile.name}</p>
        <p className="game mb-4">{profile.game}</p>
        <div className="buttons">
          <StatusButton type={sleep} index={index} name="sleep" icon="🍆" removeAll={removeAll} />
          <StatusButton type={marry} index={index} name="marry" icon="💍" removeAll={removeAll} />
          <StatusButton type={kill} index={index} name="kill" icon="🔪" removeAll={removeAll} />
        </div>
      </div>
    </>
  );
}

function StatusButton({
  type,
  index,
  name,
  icon,
  removeAll,
}: {
  type: [number | undefined, Function];
  index: number;
  name: string;
  icon: string;
  removeAll: Function;
}) {
  const active = type[0] == index;
  return (
    <Button
      className={name + (active ? " active" : "")}
      label={icon}
      onClick={() => {
        if (type[0] == index) {
          type[1](undefined);
        } else {
          removeAll();
          type[1](index);
        }
      }}
    />
  );
}

export function ProfilePreload({ profiles }: { profiles: SMKProfile[] }) {
  return (
    <>
      {profiles.map((profile) => {
        return (
          <link
            key={profile.game + "-" + profile.name}
            rel="preload"
            href={"/" + profile.path + "/" + profile.name + "." + profile.ending}
            as="image"
          />
        );
      })}
      {profiles
        .filter((profile) => profile.deathImageEnding)
        .map((profile) => {
          return (
            <link
              key={profile.game + "-X-" + profile.name}
              rel="preload"
              href={"/" + profile.path + "/" + profile.name + "_X." + profile.deathImageEnding}
              as="image"
            />
          );
        })}
    </>
  );
}
