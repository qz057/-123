import { analyzeDiagnose } from "@/lib/diagnose/analyzer";
import { DiagnoseClientPage } from "./diagnose-client-page";
import { getDiagnosePageData } from "./diagnose-content";

export default function DiagnosePage() {
  const pageData = getDiagnosePageData();

  const initialResult = analyzeDiagnose(pageData.initialForm);
  const resetResult = analyzeDiagnose(pageData.resetForm);
  const diagnoseExampleCases = pageData.diagnoseExampleCases.map((example) => ({
    ...example,
    result: analyzeDiagnose(example.form),
  }));

  return (
    <DiagnoseClientPage
      {...pageData}
      diagnoseExampleCases={diagnoseExampleCases}
      initialResult={initialResult}
      resetResult={resetResult}
    />
  );
}
