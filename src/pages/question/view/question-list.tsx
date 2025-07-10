import { useRoomQuestions } from "@/hooks/use-room-questions";
import { QuestionItem } from "../create/form-question/question-item";
import type { RoomIdbase } from "@/types/room-base-id";

export function QuestionList({ roomId }: RoomIdbase) {
  const { data } = useRoomQuestions(roomId);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-2xl text-foreground">
          Perguntas & Respostas
        </h2>
      </div>

      {data?.map((question) => (
        <QuestionItem key={question.id} question={question} />
      ))}
    </div>
  );
}
