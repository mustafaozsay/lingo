import FeedWrapper from "@/components/feed-wrapper";
import Promo from "@/components/promo";
import Quests from "@/components/quests";
import StickyWrapper from "@/components/stick-wrapper";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import UserProgress from "@/components/user-progress";
import {
  getTopTenUsers,
  getUSerProgress,
  getUserSubscription,
} from "@/db/queries";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function LeaderBoardPage() {
  const userProgressData = getUSerProgress();

  const userSubsciptionData = getUserSubscription();

  const leaderboardData = getTopTenUsers();

  const [userProgress, userSubscription, leaderboard] = await Promise.all([
    userProgressData,
    userSubsciptionData,
    leaderboardData,
  ]);

  const isPro = !!userSubscription?.isActive;

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
          hasActiveSubscription={isPro}
        />

        {!isPro && <Promo />}
        <Quests points={userProgress.points} />
      </StickyWrapper>

      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Image
            src="/leaderboard.svg"
            alt="leaderboard"
            height={90}
            width={90}
          />

          <h1
            className="text-center font-bold text-blue-800 text-2xl my-6
        "
          >
            leaderboard
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
            See where you stand among other learners in the comminty
          </p>
          <Separator className="mb-4 h-0.5 rounded-full" />
          {leaderboard.map((userProgress, index) => {
            return (
              <div
                key={userProgress.userId}
                className="flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/500"
              >
                <p className="font-bold text-lime-700 mr-4">{index + 1}</p>
                <Avatar className="border bg-green-500 h-12 w-12 ml-3 mr-6">
                  <AvatarImage
                    className="object-cover"
                    src={userProgress.userImageSrc}
                  />
                </Avatar>

                <p className="font-bold text-neutral-800 flex-1">
                  {userProgress.userName}
                </p>

                <p className="text-muted-foreground">
                  {userProgress.points} XP
                </p>
              </div>
            );
          })}
        </div>
      </FeedWrapper>
    </div>
  );
}
