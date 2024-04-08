"use client";

import React, { useState } from 'react';
import { OpeningManager } from "@ui/opening/opening-manager";
import { createClient } from '@utils/supabase/client';
import {useUser} from "@/app/(auth)/actions/useUser";

export default function OpeningPage() {

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col items-center">
                <h2 className="text-xl font-bold">Create Your Chess Openings</h2>
                <OpeningManager/>
            </div>
        </div>
    );
}
