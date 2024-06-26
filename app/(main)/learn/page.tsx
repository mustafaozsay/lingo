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
  getUserSubscription,
} from "@/db/queries";
import { redirect } from "next/navigation";
import Unit from "./unit";
import Promo from "@/components/promo";
import Quests from "@/components/quests";

export default async function LearnPage() {
  const userProgresData = getUSerProgress();
  const courseProgressData = getCourseProgress();
  const lessonPercentageData = getLessonsPercentage();
  const unitsData = getUnits();
  const userSubscriptionData = getUserSubscription();

  const [
    userProgress,
    units,
    courseProgress,
    lessonPercentage,
    userSubscription,
  ] = await Promise.all([
    userProgresData,
    unitsData,
    courseProgressData,
    lessonPercentageData,
    userSubscriptionData,
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  if (!courseProgress) {
    redirect("/courses");
  }

  const isPro = !!userSubscription?.isActive;

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        />
        {!isPro && <Promo />}
        <Quests points={userProgress.points} />
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
                  | (typeof lessons.$inferSelect & {
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
