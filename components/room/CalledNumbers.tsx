"use client";

import Image from "next/image";
import { useState } from "react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ballB from "@/components/assets/B_ball.svg";
import ballI from "@/components/assets/I_ball.svg";
import ballN from "@/components/assets/N_ball.svg";
import ballG from "@/components/assets/G_ball.svg";
import ballO from "@/components/assets/O_ball.svg";

type CalledNumbersProps = {
  numbers: number[];
  action?: ReactNode;
};

function getBingoLetter(num: number) {
  if (num >= 1 && num <= 15) return "B";
  if (num >= 16 && num <= 30) return "I";
  if (num >= 31 && num <= 45) return "N";
  if (num >= 46 && num <= 60) return "G";
  return "O";
}

const BALL_ASSETS: Record<string, typeof ballB> = {
  B: ballB,
  I: ballI,
  N: ballN,
  G: ballG,
  O: ballO,
};

export default function CalledNumbers({ numbers, action }: CalledNumbersProps) {
  const [collapsed, setCollapsed] = useState(true);

  const recentNumbers = [...numbers].reverse();
  const [currentNumber, ...previousNumbers] = recentNumbers;

  return (
    <Card className="bg-transparent shadow-none">
      <Collapsible open={!collapsed} onOpenChange={(open) => setCollapsed(!open)}>
        <CardHeader className="flex flex-row items-center justify-between gap-2 px-3 pb-2 sm:px-6">
        <CardTitle className="text-base font-semibold text-slate-900 sm:text-lg">
          Called Numbers
        </CardTitle>
        <div className="flex items-center gap-2">
          {action ? <div className="shrink-0">{action}</div> : null}
          <CollapsibleTrigger asChild>
            <Button variant="outline" size="sm" className="shrink-0">
              {collapsed ? `Show previous (${previousNumbers.length})` : "Hide previous"}
            </Button>
          </CollapsibleTrigger>
        </div>
      </CardHeader>
      <CardContent className="px-3 pb-3 sm:px-6 sm:pb-6">
          {recentNumbers.length ? (
            <div className="grid w-full grid-cols-[3.5rem_1fr] items-start gap-4 sm:grid-cols-[4.5rem_1fr]">
              {currentNumber !== undefined ? (() => {
                const letter = getBingoLetter(currentNumber);
                const asset = BALL_ASSETS[letter];
                return (
                  <div className="flex items-center gap-2 rounded-2xl px-1 py-1">
                    <div className="relative h-12 w-12 sm:h-16 sm:w-16">
                      <Image src={asset} alt={`${letter} ball`} fill className="object-contain" />
                      <div className="absolute inset-0 flex items-center justify-center font-bold text-slate-900 top-2">
                        <span className="text-sm sm:text-lg">{currentNumber}</span>
                      </div>
                    </div>
                  </div>
                );
              })() : (
                <div className="h-12 w-12 sm:h-16 sm:w-16" />
              )}

              <CollapsibleContent>
                {previousNumbers.length ? (
                  <div className="flex flex-wrap items-center gap-2">
                    {previousNumbers.map((num, index) => {
                      const letter = getBingoLetter(num);
                      return (
                        <div key={`${num}-${index}`} className="relative h-8 w-8 sm:h-10 sm:w-10">
                          <Image
                            src={BALL_ASSETS[letter]}
                            alt={`${letter} ball`}
                            fill
                            className="object-contain"
                          />
                          <div className="absolute inset-0 flex items-center justify-center font-bold text-slate-90 top-1">
                            <span className="text-[10px] sm:text-xs">{num}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </CollapsibleContent>
            </div>
          ) : (
            <span className="text-sm text-muted-foreground">No numbers called yet.</span>
          )}
        </CardContent>
      </Collapsible>
    </Card>
  );
}