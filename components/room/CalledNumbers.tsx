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
  const [currentNumber, previousNumber, ...historyNumbers] = recentNumbers;
  const hasNumbers = recentNumbers.length > 0;
  const hasHistoryNumbers = historyNumbers.length > 0;

  return (
    <Card className="bg-transparent shadow-none">
      <Collapsible open={!collapsed} onOpenChange={(open) => setCollapsed(!open)}>
        <CardHeader className="flex flex-col gap-3 px-3 pb-2 sm:px-6 items-center">
  
            <CardTitle className="text-base font-semibold text-white sm:text-lg text-center">
              Called Numbers
            </CardTitle>

            <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:flex-nowrap lg:gap-3 overflow-x-auto no-scrollbar">
              {action ? (
                <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:flex-nowrap">
                  {action}
                </div>
              ) : null}
              <div className="flex justify-center">
                <CollapsibleTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!hasHistoryNumbers}
                    className="h-8 sm:h-9 shrink-0 rounded-lg px-3 text-[11px] font-semibold sm:text-xs"
                  >
                    {collapsed
                      ? `Show History (${historyNumbers.length})`
                      : "Hide History"}
                  </Button>
                </CollapsibleTrigger>
              </div>
            </div>
            
        </CardHeader>
        <CardContent className="px-3 pb-3 pt-3">
          <div className="flex flex-col justify-center">
            <div className="flex flex-row items-center justify-center">   
              <div className="flex w-24 flex-col items-center gap-2 sm:w-28">
                <span className="text-xs font-semibold uppercase leading-none tracking-wide text-white">
                  Current
                </span>
                {currentNumber !== undefined ? (() => {
                  const letter = getBingoLetter(currentNumber);
                  const asset = BALL_ASSETS[letter];
                  return (
                    <div className="flex items-center gap-2 rounded-2xl ">
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
              </div>

              <div className="flex w-24 flex-col items-center gap-2 sm:w-28">
                <span className="text-xs font-semibold uppercase leading-none tracking-wide text-white">
                  Previous
                </span>
                {previousNumber !== undefined ? (() => {
                  const letter = getBingoLetter(previousNumber);
                  const asset = BALL_ASSETS[letter];
                  return (
                    <div className="relative h-12 w-12 sm:h-16 sm:w-16">
                      <Image src={asset} alt={`${letter} ball`} fill className="object-contain" />
                      <div className="absolute inset-0 flex items-center justify-center font-bold text-slate-900 top-2">
                        <span className="text-sm sm:text-lg">{previousNumber}</span>
                      </div>
                    </div>
                  );
                })() : (
                  <div className="h-12 w-12 sm:h-16 sm:w-16" />
                )}
              </div>
            </div>
            


            <CollapsibleContent>
              {hasHistoryNumbers ? (
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-white">
                    History
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    {historyNumbers.map((num, index) => {
                      const letter = getBingoLetter(num);
                      return (
                        <div key={`${num}-${index}`} className="relative h-8 w-8 sm:h-10 sm:w-10">
                          <Image
                            src={BALL_ASSETS[letter]}
                            alt={`${letter} ball`}
                            fill
                            className="object-contain"
                          />
                          <div className="absolute inset-0 flex items-center justify-center font-bold text-slate-900 top-1">
                            <span className="text-[10px] sm:text-xs">{num}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </CollapsibleContent>
          </div>
        </CardContent>
      </Collapsible>
    </Card>
  );
}