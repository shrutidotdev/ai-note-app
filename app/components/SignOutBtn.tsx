import { Button } from "@/components/ui/button";
import { useAuthActions } from "@convex-dev/auth/react";

const SignOutBtn = () => {
  const { signOut } = useAuthActions();

  return (
    <div>
      <Button onClick={() => signOut()}>Sign Out</Button>
    </div>
  )
}

export default SignOutBtn
