import { options } from "./api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"
import UserCard from "./components/UserCard"
import { redirect } from 'next/navigation'


export default async function Home() {
  const session = await getServerSession(options)

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/');
    return null; // Render nothing or a loading indicator until the redirect happens
  }

  return (
    <>
      <UserCard user={session.user} pagetype={"Home"} />
    </>
  );
}