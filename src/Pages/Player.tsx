import { MessageCircle } from "lucide-react";
import { useEffect } from "react";
import { Header } from "../components/Header";
import { Module } from "../components/Module";
import { Video } from "../components/Video";
import { useStore, useZustandCurrentLesson } from "../zustand-store";

export function Player() {
  const { course, load, isLoading } = useStore((state) => ({
    course: state.course,
    load: state.load,
    isLoading: state.isLoading
  }))
  const { currentLesson } = useZustandCurrentLesson()
  
  // const { modules, isLoadingCourse } = useAppSelector(state => {
  //   return {
  //     modules: state.player.course?.modules,
  //     isLoadingCourse: state.player.isLoading
  //   }
  // })

  // const dispatch = useAppDispatch()

  useEffect(() => {
    document.title = `Assistindo: ${currentLesson?.title}`
  }, [currentLesson])

  useEffect(() => {
    load()
  }, [])


  return (
    <div className="flex items-center justify-center h-screen bg-zinc-950 text-zinc-50">
      <div className="flex w-[1100px] flex-col gap-6">
        <div className="flex items-center justify-between">
          <Header />

          <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white transition-colors rounded bg-violet-500 hover:bg-violet-600">
            <MessageCircle className="w-4 h-4" />
            Deixar feedback
          </button>
        </div>

        <main className="relative flex overflow-hidden border rounded-lg shadow border-zinc-800 bg-zinc-900 pr-80">
          <div className="flex-1">
            <Video />
          </div>
          <aside className="absolute top-0 bottom-0 right-0 overflow-y-scroll transition-all border-l divide-y-2 divide-zinc-900/50 w-80 border-zinc-800 bg-zinc-900 scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800 scroll-smooth scrollbar-none hover:scrollbar-thin">
            {
              isLoading ?
              <div className="w-full h-full">
                <div className="w-full h-20 mb-2 bg-zinc-800 animate-pulse" />
                <div className="w-full h-full px-6 py-4 space-y-4 bg-zinc-90 animate-pulse0">
                  <div className="w-full h-6 rounded bg-zinc-800 animate-pulse"/>
                  <div className="w-full h-6 rounded bg-zinc-800 animate-pulse"/>
                  <div className="w-full h-6 rounded bg-zinc-800 animate-pulse"/>
                  <div className="w-full h-6 rounded bg-zinc-800 animate-pulse"/>
                  <div className="w-full h-6 rounded bg-zinc-800 animate-pulse"/>
                </div>
              </div>
                :
                course?.modules.map((module, index) => (
                <Module
                  key={module.id}
                  moduleIndex={index}
                  title={module.title}
                  amountOfLessons={module.lessons.length}
                />
              ))
            }
          </aside>
        </main>
      </div>
    </div>
  )
}