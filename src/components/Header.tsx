import { useStore, useZustandCurrentLesson } from "../zustand-store"

export function Header() {
  const { currentModule, currentLesson } = useZustandCurrentLesson()
  const isLoading = useStore(store => store.isLoading)

  if (isLoading) {
    return (
      <div className="flex flex-col gap-1">
        <h1 className="w-48 h-6 text-2xl font-bold rounded bg-zinc-700 animate-pulse" />
        <span className="h-6 text-sm rounded w-52 text-zinc-400 bg-zinc-700 animate-pulse" />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-bold">{currentLesson?.title}</h1>
      <span className="text-sm text-zinc-400">Módulo - {currentModule?.title}</span>
    </div>
  )
}