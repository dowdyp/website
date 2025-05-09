const remToPx = (n: number) => {
    const fs = document.querySelector("html");
    if(fs && fs.style.fontSize) {
        const s = parseInt(fs.style.fontSize);
        return s * n;
    } else {
        return 16 * n;
    }
}

export default remToPx;