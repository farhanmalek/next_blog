import {proxy} from "valtio";

//What property do I want to store in my state? The logged in JWT ofcourse.

type MyState = {
    userJwt: string | null,
}

export const state = proxy<MyState>({
    userJwt: null
})