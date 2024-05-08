"use client";

import { signOut } from "aws-amplify/auth";
import React from "react";

function Button() {
  return (
    <button
      onClick={() => {
        signOut();
      }}>
      Log Out
    </button>
  );
}

export default Button;
