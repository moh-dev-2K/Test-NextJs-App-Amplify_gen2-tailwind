"use client";

import React, { useEffect } from "react";
import { Amplify } from 'aws-amplify';
import outputs from '@/amplify_outputs.json';
import {get} from "aws-amplify/api"

Amplify.configure(outputs);

function Dashboard() {

  async function test() {
    try {
      const restOperation = get({
        apiName: "test-rest-api",
        path: "items"
      })
      const response = await restOperation.response;
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    test()
  })

  return (
    <div className="flex justify-center items-center h-full">
      <div className="text-2xl text-center font-semibold">
        Dashboard Coming Soon........
      </div>
    </div>
  );
}

export default Dashboard;
