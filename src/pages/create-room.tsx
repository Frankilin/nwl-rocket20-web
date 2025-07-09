import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

type GetRoomsAPIResponse = [
  {
    id: string;
    name: string;
  }
];

export function CreateRoom() {
  const { data, isLoading } = useQuery({
    queryKey: ["get-rooms"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3333/rooms");
      const result: GetRoomsAPIResponse = await response.json();

      return result;
    },
  });

  return (
    <div>
      <div>Create room</div>

      {isLoading && <p>Carregando...</p>}

      <Link className="underline" to="/room">
        Acessar sala
      </Link>

      {data?.map((room) => {
        return (
          <div key={room.id} className="flex flex-col gap-1">
            <Link to={`/room/${room.id}`}>{room.name}</Link>
          </div>
        );
      })}
    </div>
  );
}
