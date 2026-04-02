"use client";

import { useState, useTransition } from "react";
import { analyzeDiagnoseAction } from "./actions";
import type { PreparedDiagnoseExampleCase } from "./diagnose-content";
import type { DiagnoseInput, DiagnoseResult } from "@/types/diagnose";

type UseDiagnoseFlowParams = {
  initialForm: DiagnoseInput;
  initialResult: DiagnoseResult;
  resetForm: DiagnoseInput;
  resetResult: DiagnoseResult;
};

export function useDiagnoseFlow({ initialForm, initialResult, resetForm, resetResult }: UseDiagnoseFlowParams) {
  const [form, setForm] = useState<DiagnoseInput>(initialForm);
  const [result, setResult] = useState(initialResult);
  const [mobileStep, setMobileStep] = useState(1);
  const [isPending, startTransition] = useTransition();

  function updateField<K extends keyof DiagnoseInput>(key: K, value: DiagnoseInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function requestDiagnosis(nextForm: DiagnoseInput, nextStep?: number) {
    if (typeof nextStep === "number") {
      setMobileStep(nextStep);
    }

    startTransition(async () => {
      const nextResult = await analyzeDiagnoseAction(nextForm);
      setResult(nextResult);
    });
  }

  function runDiagnose() {
    requestDiagnosis(form, 4);
  }

  function loadExample() {
    setForm({ ...initialForm });
    setResult(initialResult);
    setMobileStep(1);
  }

  function applyExample(example: PreparedDiagnoseExampleCase) {
    setForm({ ...example.form });
    setResult(example.result);
    setMobileStep(4);
  }

  function resetCurrentForm() {
    setForm({ ...resetForm });
    setResult(resetResult);
    setMobileStep(1);
  }

  return {
    form,
    result,
    mobileStep,
    isPending,
    setMobileStep,
    updateField,
    requestDiagnosis,
    runDiagnose,
    loadExample,
    applyExample,
    resetCurrentForm,
  };
}
