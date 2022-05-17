export function get_youtube_video_id(url: string) {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : false;
}

export function make_youtube_video_embed_url(id: string) {
  return `https://www.youtube.com/embed/${id}`;
}
