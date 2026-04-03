#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PORT="${PORT:-3417}"
BUILD_LOG="$(mktemp)"
SERVER_LOG="$(mktemp)"

cleanup() {
  if [[ -n "${SERVER_PID:-}" ]] && kill -0 "$SERVER_PID" 2>/dev/null; then
    kill "$SERVER_PID" 2>/dev/null || true
    wait "$SERVER_PID" 2>/dev/null || true
  fi
  rm -f "$BUILD_LOG" "$SERVER_LOG"
}
trap cleanup EXIT

fail() {
  echo "[diagnose-smoke] $1" >&2
  exit 1
}

cd "$ROOT_DIR"

echo "[1/5] 结构边界检查"
grep -q 'import { analyzeDiagnose } from "@/lib/diagnose/analyzer";' app/diagnose/page.tsx || fail "app/diagnose/page.tsx 未保持 server 侧 analyzer 预计算"
if grep -q '@/lib/diagnose/analyzer' app/diagnose/diagnose-client-page.tsx; then
  fail "diagnose-client-page.tsx 重新直连 analyzer 了"
fi
grep -q 'analyzeDiagnoseAction' app/diagnose/use-diagnose-flow.ts || fail "客户端诊断链路未走 analyzeDiagnoseAction"
grep -q 'DiagnoseResultPanel' app/diagnose/diagnose-client-page.tsx || fail "client page 未收口 DiagnoseResultPanel"
grep -q 'DiagnoseExampleCases' app/diagnose/diagnose-client-page.tsx || fail "client page 未收口 DiagnoseExampleCases"
CLIENT_LINES="$(wc -l < app/diagnose/diagnose-client-page.tsx | tr -d ' ')"
PAGE_LINES="$(wc -l < app/diagnose/page.tsx | tr -d ' ')"
if (( CLIENT_LINES > 160 )); then
  fail "diagnose-client-page.tsx 行数过大：${CLIENT_LINES}（预期 <= 160）"
fi
if (( PAGE_LINES > 40 )); then
  fail "app/diagnose/page.tsx 行数过大：${PAGE_LINES}（预期 <= 40）"
fi
echo "  - client page lines: ${CLIENT_LINES}"
echo "  - server page lines: ${PAGE_LINES}"

echo "[2/5] 构建"
npm run build >"$BUILD_LOG" 2>&1 || {
  tail -n 80 "$BUILD_LOG" >&2
  fail "npm run build 失败"
}
tail -n 20 "$BUILD_LOG"

echo "[3/5] 启动本地预览"
PORT="$PORT" npm run start >"$SERVER_LOG" 2>&1 &
SERVER_PID=$!

READY=0
for _ in $(seq 1 30); do
  if node --input-type=module - "$PORT" <<'NODE'
const port = process.argv[2];
try {
  const res = await fetch(`http://127.0.0.1:${port}/diagnose`);
  process.exit(res.ok ? 0 : 1);
} catch {
  process.exit(1);
}
NODE
  then
    READY=1
    break
  fi
  sleep 1
done

if (( READY == 0 )); then
  tail -n 80 "$SERVER_LOG" >&2
  fail "next start 未在预期时间内就绪"
fi

echo "[4/5] 路由与关键文案 smoke"
node --input-type=module - "$PORT" <<'NODE'
const port = process.argv[2];
const checks = [
  {
    path: "/diagnose",
    expected: ["配置诊断器", "直接开始输入", "如果你不想从空白输入开始，再从这些典型现场起步"],
  },
  {
    path: "/docs/diagnose",
    expected: ["Diagnose 文档", "npm run smoke:diagnose", "如果你正在迭代 Diagnose 本页本身"],
  },
];

for (const item of checks) {
  const res = await fetch(`http://127.0.0.1:${port}${item.path}`);
  if (!res.ok) {
    throw new Error(`${item.path} returned ${res.status}`);
  }
  const html = await res.text();
  for (const text of item.expected) {
    if (!html.includes(text)) {
      throw new Error(`${item.path} missing expected text: ${text}`);
    }
  }
  console.log(`  - ${item.path} ok`);
}
NODE

echo "[5/5] 结果"
echo "diagnose smoke passed"
