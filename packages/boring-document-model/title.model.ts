type BoringTitleIcon = string;

export type BoringTitleLike = string | PageIconAndName | BoringTitle;

export interface PageIconAndName {
  icon?: BoringTitleIcon;
  name: string;
}

export interface BoringTitle extends PageIconAndName {
  raw: string;
  icon?: BoringTitleIcon;
  name: string;
}

export class BoringTitle implements BoringTitle {
  constructor(p: PageIconAndName | string) {
    if (typeof p == "string") {
      const _p = parseraw(p);
      this.icon = _p.icon;
      this.name = _p.name;
      this.raw = p;
    } else {
      this.icon = p.icon;
      this.name = p.name;
      this.raw = buildraw(p);
    }
  }
}

/**
 * icon | name single string separator
 *
 * DO NOT CHANGE THE VALUE
 *
 * e.g. - `{ icon: ":smile", name: "Title" }` -> `":smile|Title"`
 */
const _separator = "|";
/**
 * 1. `{ name: `"|Title"` }` -> `"|Title"`
 * 2. `{ icon: ":smile", name: "Title" }` -> `":smile|Title"`
 * 3. `{ name: "Title" }` -> `"Title"`
 */
function buildraw(p: PageIconAndName): string {
  return (p.icon ? p.icon + _separator : "") + p.name;
}

/**
 * 1. `"|Title"` -> `{ name: `"|Title"` }`
 * 2. `":smile|Title"` -> `{ icon: ":smile", name: "Title" }`
 * 3. `"Title"` -> `{ name: "Title" }`
 * @param raw
 * @returns
 */
function parseraw(raw: string): PageIconAndName {
  let _icon: BoringTitleIcon;
  let _name: string;
  if (raw.includes(_separator)) {
    if (raw.startsWith(_separator)) {
      _name = raw;
    } else {
      const _splts = raw.split(_separator);
      _icon = _splts[0];
      _name = _splts[1];
    }
  } else {
    _name = raw;
  }
  return {
    icon: _icon,
    name: _name,
  };
}
