import { Game } from "./game";

export default function Home() {
  return (
    <div className="flex w-full flex-1 flex-col items-center px-4 py-4 xl:px-6">
      <Game />
    </div>
  );
}
