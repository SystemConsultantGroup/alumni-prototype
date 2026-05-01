import { MEMBERS } from "@/data/members";

// Prototype: hard-coded current user. Replace when auth backend is wired up.
export const CURRENT_USER = {
  id: "me",
  name: "홍길동",
};

export const isCurrentUserName = (name: string) => name === CURRENT_USER.name;

// Mock posts only carry author as a name string. Map back to a stable id
// so reports/blocks can target the same user across UGC areas.
export const resolveAuthorId = (authorName: string): string => {
  if (authorName === CURRENT_USER.name) return CURRENT_USER.id;
  const member = MEMBERS.find((m) => m.name === authorName);
  return member?.id ?? `unknown:${authorName}`;
};
