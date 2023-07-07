import { Loader } from "lucide-react";
import ReactPlayer from "react-player";
import { useStore, useZustandCurrentLesson } from "../zustand-store";

export function Video() {
  const { currentLesson } = useZustandCurrentLesson()
  const { isLoading, next } = useStore((state) => ({
    isLoading: state.isLoading,
    next: state.next
  }))

  function handlePlayNext(){
    next()
  }

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      {isLoading ? (
        <div className="flex items-center justify-center w-full">
          <Loader className="w-6 h-6 text-zinc-400 animate-spin" />
        </div>
      ): (
        <ReactPlayer
          width="100%"
          height="100%"
          controls
          playing
          onEnded={handlePlayNext}
          url={`https://www.youtube.com/watch?v=${currentLesson?.id}`}
        />    
      )}
   </div>
  )
}