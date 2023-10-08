"use client";
import { Profile } from "@/components";
import { useState } from "react";
import { experimental_useFormState } from "react-dom";

export default function Home() {
  const [id, setId] = useState<string>("816253376962625537");
  const [state, formAction] = experimental_useFormState();

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <form action={setId}></form>
      <Profile userId={id} />
    </div>
  );
}
