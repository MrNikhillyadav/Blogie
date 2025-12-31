import ProfilePage from "@/app/(main)/dashboard/ProfilePage";
import { Redirect } from "@/components/Redirect";
import { authSession } from "@/lib/auth-utils";


export default async function Dashboard() {
  const session = await authSession()
  
  if(!session){
    console.log("session not found, redirectiing")
    return (
      <div className="flex flex-col items-center justify-center bg-zinc-100 text-neutral-900 ">
        <h1>Redirecting...</h1>
        <Redirect to={'/sign-in'} />
      </div>
    )
  }
  

return <ProfilePage/>
}