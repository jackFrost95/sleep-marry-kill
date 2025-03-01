"use server";
import path from "path";
import fs from "fs";
import { SMKProfile } from "@/global/types";

export async function getAllProfiles(): Promise<SMKProfile[]> {
    const basePath = "static/normal"
    const dir = process.cwd()+"/static/normal";
    const directories: string[] = fs.readdirSync(dir); // gets all directories

        
    let index = 0;
    const profiles: SMKProfile[] = [];

    //const profiles: SMKProfile = 
    directories.forEach((directory, i) => {
        const subDir = path.resolve(basePath + "/" + directory);
        const files = fs.readdirSync(subDir); //gets all images

        // turns the image-files into profiles
        files.forEach((file) => {
            if(file.includes("_X.")) return; // Skip this step for DeathFiles
            const fileParts = file.split(".");
            if(fileParts.length > 2) {
                for(let filePart of fileParts) {
                    if(filePart == fileParts[0]) {
                        continue;
                    } else if(filePart != fileParts[fileParts.length-1]) {
                        fileParts[0] = fileParts[0] + "." + filePart;
                    } else if (filePart != fileParts[0]) {
                        fileParts[1] = filePart;
                    }
                }
            }
            const deathFile = files.find(dF => {return dF.includes(fileParts[0]+"_X")});
            console.log(basePath+"/"+directory);
            
            const tempFile: SMKProfile = {
                name: fileParts[0],
                ending: fileParts[1],
                game: directory,
                path: basePath + "/" + directory,
                deathImageEnding: deathFile ? deathFile.split(".")[1] : undefined
            }
            profiles[index] = tempFile;
            index++;
        })
    });
    console.log(profiles);
    return profiles;
}