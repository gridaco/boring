export class BoringContent {
  constructor(raw: string) {
    this.raw = raw;
  }
  raw: string;
}

export type BoringContentLike = BoringContent | string;

export function boringContentLikeAsBoringContent(
  p: BoringContentLike
): BoringContent {
  if (p instanceof BoringContent) {
    return p;
  } else if (typeof p == "string") {
    return new BoringContent(p);
  }
}
