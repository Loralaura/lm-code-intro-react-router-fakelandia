import { MISDEMEANOURS } from "./misdemeanours.types";

export const REASONS = [...MISDEMEANOURS, "just-talk"] as const;
export type Reason = (typeof REASONS)[number];

export type PostData = {
  subject: string;
  reason: Reason;
  details: string;
};

export type ConfessResponse = {
  success: boolean;
  justTalked: boolean;
  message: string;
};
