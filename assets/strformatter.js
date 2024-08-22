/** 
 * @author cupglassdev
 * @license MIT
 */

/** 
 * This script is DESIGNED for browser so it will returns `<br>` for newlines.
 * To disable the formatter for each string in the slides, starts with `>NOSTRF<` with space at the end
 * @param {string} str
 * @returns {string}
*/
export default function (str) {

    /**
     * ENOUGH IS ENOUGH
     * bcs i was confused with newlines back then,
     * heres the tip
     * 
     * Windows ALWAYS uses \r\n
     * 
     * MacOS, on older oses they uses \r ONLY. 
     * But the modern one uses \n, like Linux
     * 
     * Linux uses \n
     * 
     * + added some break lines lol so the formatter will worked properly
     */
    const n = /(\r\n|\r|\n)/
    if (str.length < 1||str.startsWith(">NOSTRF< ")) return str;
    let sentence = str
    /**
     * 
     * @param {string} c 
     */
    const f = function (c) {
        sentence = sentence.split(c)
        for (const idx in sentence) {
            let cAt = 0
            for (const each of sentence[idx].split('')) {
                if (each === " " || n.test(each)) {
                    cAt++
                } else break
            }
            const char = sentence[idx].charAt(cAt)
            sentence[idx] = (cAt<1?"":sentence[idx].substring(0, idx)) + char.toUpperCase() + sentence[idx].substring(cAt+1)
        }
        for (const idx in sentence) {
            if (n.test(sentence[idx])) {
                sentence[idx].split(n).join("<br>")
            }
        }
        sentence = sentence.join(c)
        return f
    }
    f(".")("?")("!")("。")
    return sentence
}
