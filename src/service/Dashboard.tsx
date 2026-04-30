import apiclient from "@/config/ApiClient"

export const fetchDashboard = async () => {
  const res = await apiclient.get('/bookings/dashboard')
  return res.data
}