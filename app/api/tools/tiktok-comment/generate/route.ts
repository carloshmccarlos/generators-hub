import { generateComments, createServerError, generateCommentInputSchema } from "@/lib/tools/tiktok-comment";
import { readServerEnv } from "@/lib/server-env";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = generateCommentInputSchema.parse(body) as import("@/lib/tools/tiktok-comment").GenerateCommentInput;

    const env: Record<string, string | undefined> = {
      SILICON_API_KEY: readServerEnv("SILICON_API_KEY"),
      SILICON_MODEL: readServerEnv("SILICON_MODEL"),
      SILICON_BASE_URL: readServerEnv("SILICON_BASE_URL"),
      KEY: readServerEnv("KEY"),
    };

    const result = await generateComments(input, { env });
    return Response.json(result);
  } catch (error) {
    const appError = createServerError(error);
    return Response.json({ error: appError.message }, { status: appError.status });
  }
}
