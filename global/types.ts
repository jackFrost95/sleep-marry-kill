/* ********* */
/* Minigames */
/* ********* */

/* Smash or Pass */

export type SopProfile = {
    name: string,
    imageName: string,
    smash?: boolean
}

/* Shopping Trip */

export type STLevel = {
    label: string,
    path: string,
    death?: boolean
    finish?: boolean
    choices?: STChoice[]
}

export type STChoice = {
    label: string,
    path: string,
    flag?: string
}

/* Sleep, Marry, Kill */

export type SMKProfile = {
    name: string,
    ending: string,
    game: string,
    path: string,
    deathImageEnding?: string
}

export type SMKFinishedProfiles = {
    sleep: SMKProfile,
    marry: SMKProfile,
    kill: SMKProfile
}