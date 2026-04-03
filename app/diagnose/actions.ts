"use server";

import { analyzeDiagnose } from "@/lib/diagnose/analyzer";
import type { DiagnoseInput } from "@/types/diagnose";

export async function analyzeDiagnoseAction(input: DiagnoseInput) {
  return analyzeDiagnose(input);
}
