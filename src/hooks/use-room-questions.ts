import type { GetRoomsQuestionResponse } from "@/types/get-room-question-response";
import { useQuery } from "@tanstack/react-query";

export function useRoomQuestions(roomId: string) {
  return useQuery({
    queryKey: ["get-rooms", roomId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3333/rooms/${roomId}/questions`);
      const result: GetRoomsQuestionResponse = await response.json();

      return result;
    },
  });
}
