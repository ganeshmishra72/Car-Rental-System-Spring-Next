import { fetchDashboard } from "@/service/Dashboard"
import { useQuery } from "@tanstack/react-query"

export const useDashboard = () => {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: fetchDashboard,
    staleTime:1000*60*5,
    refetchOnWindowFocus:false,
    refetchInterval: 5000,
    retry:1
  })
}