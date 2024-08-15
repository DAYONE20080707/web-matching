import { useInfiniteQuery } from "@tanstack/react-query"
import { getMessages } from "@/actions/message"

type MessageQueryProps = {
  queryKey: string[]
  companyId: string
}

export const useMessageQuery = ({ queryKey, companyId }: MessageQueryProps) => {
  const fetchMessagesQuery = async ({ pageParam }: { pageParam?: string }) => {
    const res = await getMessages({ companyId, cursor: pageParam })
    return res
  }

  return useInfiniteQuery({
    queryKey: queryKey,
    initialPageParam: undefined,
    queryFn: fetchMessagesQuery,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
  })
}
