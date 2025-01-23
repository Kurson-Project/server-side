export const sendJson = ({message = "",data = {}}) =>  ({message,data})
export function containsSpecialChars(str : String) {
    const pattern = /[\/=<>|,"'\[\]]/;
    return pattern.test(String(str));
}
