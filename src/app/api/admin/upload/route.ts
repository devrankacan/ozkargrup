import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { spawn } from "child_process";
import { requireAdmin } from "@/lib/requireAdmin";

function scheduleRestart() {
  if (!process.env.PM2_APP_NAME) return;
  const child = spawn("sh", ["-c", `sleep 2 && pm2 restart ${process.env.PM2_APP_NAME}`], {
    detached: true,
    stdio: "ignore",
  });
  child.unref();
}

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/x-icon", "image/vnd.microsoft.icon"];
const MAX_SIZE = 5 * 1024 * 1024;

export async function POST(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const formData = await req.formData();
  const file = formData.get("file");
  const targetRaw = formData.get("target");
  const ALLOWED_TARGETS = ["cars", "logo", "hero", "favicon"];
  const target = ALLOWED_TARGETS.includes(targetRaw as string) ? (targetRaw as string) : "cars";

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Dosya bulunamadı." }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Sadece JPG, PNG, WEBP, GIF veya ICO yükleyebilirsiniz." }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "Dosya 5MB'dan büyük olamaz." }, { status: 400 });
  }

  const ext = path.extname(file.name) || `.${file.type.split("/")[1]}`;
  const filename = `${randomUUID()}${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads", target);
  const filePath = path.join(uploadDir, filename);

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filePath, buffer);
  scheduleRestart();

  return NextResponse.json({ url: `/uploads/${target}/${filename}` });
}
