import FeedWrapper from "@/components/feed-wrapper";
import StickyWrapper from "@/components/stick-wrapper";
import Header from "./header";
import UserProgress from "@/components/user-progress";
import { lessons, userProgress, units as unitSchema } from "@/db/schema";
import {
  getCourseProgress,
  getLessonsPercentage,
  getUSerProgress,
  getUnits,
} from "@/db/queries";
import { redirect } from "next/navigation";
import Unit from "./unit";

export default async function LearnPage() {
  const userProgresData = getUSerProgress();
  const courseProgressData = getCourseProgress();
  const lessonPercentageData = getLessonsPercentage();
  const unitsData = getUnits();

  const [userProgress, units, courseProgress, lessonPercentage] =
    await Promise.all([
      userProgresData,
      unitsData,
      courseProgressData,
      lessonPercentageData,
    ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  if (!courseProgress) {
    redirect("/courses");
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={false}
        />
      </StickyWrapper>

      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />
        {units.map((unit) => (
          <div key={unit.id} className="mb-10">
            <Unit
              id={unit.id}
              order={unit.order}
              description={unit.description}
              title={unit.title}
              lessons={unit.lessons}
              activeLesson={
                courseProgress.activeLesson as
                   (typeof lessons.$inferSelect & {
                      unit: typeof unitSchema.$inferSelect;
                    })
                  | undefined
              }
              activeLessonPercentage={lessonPercentage}
            />
          </div>
        ))}
      </FeedWrapper>
    </div>
  );
}
