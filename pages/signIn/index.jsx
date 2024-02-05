import SignInBtn from "../../components/SignInBtn.jsx";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function SignIn() {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/schedule");
    }
  }, [sessionStatus, router]);
  return (
      <div className="signIn__container">
        <SignInBtn />
      </div>
    )
}