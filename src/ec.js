/* Educación Continua — enlace entre el curso y la página «Cursos Educación Continua».
 * Es un candado simple del lado del navegador: sirve para ordenar la ruta de formación,
 * no es seguridad bancaria (cualquiera que lea el código fuente podría saltárselo). */
export const COURSE_ID = "apa7";
export const COURSE_TITLE = "APA 7";
export const HUB_URL = "https://cursoseducacioncontinua.vercel.app/";
const SALT = "fc-educacion-continua-2026";
const EC_KEY = "educacion-continua-modo-v1";

export function hash(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, "0");
}

export function token(id) {
  return hash(id + "|" + SALT);
}

/** Devuelve true si el participante llegó desde Educación Continua (?ec=1). */
export function isEcMode() {
  let fromUrl = false;
  try {
    fromUrl = new URLSearchParams(window.location.search).get("ec") === "1";
  } catch {}
  try {
    if (fromUrl) localStorage.setItem(EC_KEY, "1");
    return fromUrl || localStorage.getItem(EC_KEY) === "1";
  } catch {
    return fromUrl;
  }
}

export function completionUrl() {
  return HUB_URL + "?completado=" + COURSE_ID + "&t=" + token(COURSE_ID);
}
