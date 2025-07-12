import type { CreateQuestionRequest } from "@/types/create-question-request";
import type { CreateQuestionResponse } from "@/types/create-question-response";
import type { GetRoomsQuestionResponse } from "@/types/get-room-question-response";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateQuestion(roomId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateQuestionRequest) => {
      const response = await fetch(
        `http://localhost:3333/rooms/${roomId}/questions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result: CreateQuestionResponse = await response.json();

      return result;
    },

    //Executa no momeno que for feita a chamada p/api
    onMutate({ question }) {
      const questions = queryClient.getQueryData<GetRoomsQuestionResponse>([
        "get-questions",
        roomId,
      ]);

      const questionArray = questions ?? [];

      const newQuestion = {
        id: crypto.randomUUID(),
        question,
        answer: null,
        createdAt: new Date().toISOString(),
        isGeneratingAnswer: true,
      };

      queryClient.setQueryData<GetRoomsQuestionResponse>(
        ["get-questions", roomId],
        [newQuestion, ...questionArray]
      );

      return { newQuestion, questions };
    },

    onSuccess(data, _variables, context) {
      queryClient.setQueryData<GetRoomsQuestionResponse>(
        ["get-questions", roomId],
        (questions) => {
          if (!context.newQuestion) {
            return questions;
          }

          if (!questions) {
            return questions;
          }

          return questions.map((question) => {
            if (question.id === context.newQuestion.id) {
              return {
                ...context.newQuestion,
                id: data.questionId,
                answer: data.answer,
                isGeneratingAnswer: false,
              };
            }
            return question;
          });
        }
      );
    },

    onError(_error, _variables, context) {
      if (context?.questions) {
        queryClient.setQueryData<GetRoomsQuestionResponse>(
          ["get-questions", roomId],
          context.questions
        );
      }
    },

    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ["get-questions", roomId] });
    // },
  });
}
