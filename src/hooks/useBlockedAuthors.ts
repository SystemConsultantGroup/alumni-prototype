import { selectBlocks, useReportStore } from "@/data/reports";
import { CURRENT_USER } from "@/lib/currentUser";
import { MEMBERS } from "@/data/members";

export const useBlockedAuthorIds = (): Set<string> => {
  const blocks = useReportStore(selectBlocks);
  return new Set(
    blocks
      .filter((b) => b.blockerMemberId === CURRENT_USER.id)
      .map((b) => b.blockedMemberId),
  );
};

export const useBlockedAuthorNames = (): Set<string> => {
  const blocks = useReportStore(selectBlocks);
  return new Set(
    blocks
      .filter((b) => b.blockerMemberId === CURRENT_USER.id)
      .map((b) => b.blockedName),
  );
};

export const useIsAuthorBlocked = (memberId: string): boolean => {
  const ids = useBlockedAuthorIds();
  return ids.has(memberId);
};

// Helper for legacy mock posts where author is stored as a name string only.
// Resolves the name back to a memberId via MEMBERS, then checks the block set.
export const useIsAuthorNameBlocked = (authorName: string): boolean => {
  const blockedIds = useBlockedAuthorIds();
  const blockedNames = useBlockedAuthorNames();
  if (blockedNames.has(authorName)) return true;
  const member = MEMBERS.find((m) => m.name === authorName);
  return member ? blockedIds.has(member.id) : false;
};
