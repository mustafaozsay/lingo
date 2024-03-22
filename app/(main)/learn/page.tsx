import FeedWrapper from "@/components/feed-wrapper";
import StickyWrapper from "@/components/stick-wrapper";
import Header from "./header";
import UserProgress from "@/components/user-progress";
import { userProgress } from "@/db/schema";
import { getUSerProgress } from "@/db/queries";
import { redirect } from "next/navigation";

export default async function LearnPage() {
  const userProgresData = getUSerProgress();

  const [userProgress] = await Promise.all([userProgresData]);

  if (!userProgress || !userProgress.activeCourse) {
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
      </FeedWrapper>
    </div>
  );
}
