/**
 * parse id from video url
 *
 * e.g. - from "https://vimeo.com/697387375"
 * @param url
 * @returns
 */
export function get_vimeo_video_id(url: string) {
  const regExp =
    /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;
  const match = url.match(regExp);
  if (match) {
    return match[5];
  }
}

export function make_vimeo_video_embed_url(id: string) {
  return `https://player.vimeo.com/video/${id}`;
}
