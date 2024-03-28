import { lessons, units } from "@/db/schema";
import UnitBanner from "./unit-banner";
import LessonButton from "./lesson-button";

type Props = {
  id: number;
  order: number;
  description: string;
  title: string;
  lessons: (typeof lessons.$inferInsert & {
    completed: boolean;
  })[];
  activeLesson:
    | (typeof lessons.$inferInsert & {
        unit: typeof units.$inferInsert;
      })
    | undefined;
  activeLessonPercentage: number;
};

export default function Unit({
  id,
  order,
  description,
  title,
  lessons,
  activeLesson,
  activeLessonPercentage,
}: Props) {
  return (
    <>
      <UnitBanner title={title} description={description} />
      <div className="flex items-center flex-col relative">
        {lessons.map((lesson, index) => {
          const isCurrent = lesson.id === activeLesson?.id;
          const isLocked = !lesson.completed && !isCurrent;

          return (
            <LessonButton
              key={lesson.id}
              id={lesson.id}
              index={index}
              totalCount={lessons.length - 1}
              current={isCurrent}
              locked={isLocked}
              percentage={activeLessonPercentage}
            />
          );
        })}
      </div>
    </>
  );
}
