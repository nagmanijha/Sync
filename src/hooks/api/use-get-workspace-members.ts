import { getMembersInWorkspaceQueryFn } from "../../lib/api";
import { useQuery } from "@tanstack/react-query";

export const useGetWorkspaceMembers = ({
  workspaceId,
  pageSize,
  pageNumber,
  keyword,
}: {
  workspaceId: string;
  pageSize?: number;
  pageNumber?: number;
  keyword?: string;
}) => {
  const query = useQuery({
    queryKey: ["members", workspaceId, pageSize, pageNumber, keyword],
    queryFn: () =>
      getMembersInWorkspaceQueryFn({
        workspaceId,
        pageSize,
        pageNumber,
        keyword,
      }),
    staleTime: Infinity,
  });
  return query;
};
