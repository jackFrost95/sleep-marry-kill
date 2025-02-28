/* ********* */
/* Minigames */
/* ********* */

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