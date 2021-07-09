import { WORD_MAX_FREQ, COMMON_WORDS } from "./Constants";

export const populate = (arr, tokens) => {

    // alert(JSON.stringify(tokens));
    // console.log({ WORD_MAX_FREQ, COMMON_WORDS });

    tokens.forEach((t) => {
        let idx = arr.findIndex((a) => a.text == t);

        if (idx == -1) arr.push({ text: t, value: 1 });
        else arr[idx].value++;
    });
}

export const trim = (arr) => {
    let x = arr.filter(
        (e) => e.value >= WORD_MAX_FREQ && !COMMON_WORDS.includes(e.text)
    );

    x.sort((a, b) => b.value - a.value);

    return x;
}

export const scrollIntoView = (id) => {
    let elem = document.getElementById(id);
    elem.scrollIntoView({ behavior: "smooth" });
}