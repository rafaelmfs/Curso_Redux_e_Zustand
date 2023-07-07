import * as Collapsible from '@radix-ui/react-collapsible';
import { ChevronDown } from "lucide-react";
import { useStore } from '../zustand-store';
import { Lesson } from "./Lesson";


interface ModuleProps{
  moduleIndex: number;
  title: string;
  amountOfLessons: number;
}

export function Module({ moduleIndex, title, amountOfLessons }: ModuleProps) {
  const { currentModuleIndex, currentLessonIndex, play } = useStore((state) => ({
    currentModuleIndex: state.currentModuleIndex,
    currentLessonIndex: state.currentLessonIndex,
    play: state.play
  }))
  
  const lessons = useStore((state) => {
    return  state.course?.modules[moduleIndex].lessons
  })
 
  return (
    <Collapsible.Root
      className="group"
      defaultOpen={moduleIndex === 0}>
      <Collapsible.Trigger className="flex items-center w-full gap-3 p-4 bg-zinc-800">
        <div className="flex items-center justify-center w-10 h-10 text-xs rounded-full bg-zinc-950">{moduleIndex + 1}</div>
        <div className="flex flex-col gap-1 text-left">
          <strong>{title}</strong>
          <span className="text-xs text-zinc-400">{amountOfLessons}</span>
        </div>

        <ChevronDown className="w-5 h-5 ml-auto text-zinc-400 group-data-[state=open]:-rotate-180 transition-transform" />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <nav className="relative flex flex-col gap-4 p-6">
          {lessons?.map((lesson, lessonIndex) => {
            return (
              <Lesson
                key={lesson.id}
                title={lesson.title}
                duration={lesson.duration}
                onPlay={() => play([moduleIndex, lessonIndex])}
                isCurrent={ 
                  currentModuleIndex === moduleIndex && currentLessonIndex === lessonIndex
                }
              />
            )
          })}
        </nav>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}