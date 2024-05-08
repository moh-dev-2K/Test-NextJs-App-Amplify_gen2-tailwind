"use client";

import React, { useEffect } from "react";
import { Hub } from "aws-amplify/utils";
import { signInWithRedirect, getCurrentUser } from "aws-amplify/auth";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import { useRouter } from "next/navigation";

Amplify.configure(outputs);

const App = () => {
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload }) => {
      switch (payload.event) {
        case "signInWithRedirect":
          getUser();
          break;
        case "signInWithRedirect_failure":
          console.log("An error has ocurred during the OAuth flow.");
          break;
        case "customOAuthState":
          break;
      }
    });

    getUser();

    return unsubscribe;
  }, []);

  const getUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      router.push("/users");
      console.log(currentUser);
    } catch (error) {
      console.error(error);
      console.log("Not signed in");
    }
  };

  return (
    <div className="App">
      <button onClick={() => signInWithRedirect()}>Open Hosted UI</button>
    </div>
  );
};

export default App;
