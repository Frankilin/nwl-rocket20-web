import type { GetRoomsAPIResponse } from "@/types/get-room-response";
import { useQuery } from "@tanstack/react-query";

export function useQueryRoom() {
  return useQuery({
    queryKey: ["get-rooms"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3333/rooms");
      const result: GetRoomsAPIResponse = await response.json();

      return result;
    },
  });
}