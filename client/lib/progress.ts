import { supabase } from "./supabase";

export async function getCompletedExercises(userId: string): Promise<string[]> {
  const { data, error } = await supabase
    .from("exercise_progress")
    .select("exercise_id")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching progress:", error);
    return [];
  }

  return data.map((row) => row.exercise_id);
}

export async function markExerciseComplete(
  userId: string,
  exerciseId: string,
): Promise<boolean> {
  const { error } = await supabase.from("exercise_progress").upsert(
    {
      user_id: userId,
      exercise_id: exerciseId,
    },
    { onConflict: "user_id,exercise_id" },
  );

  if (error) {
    console.error("Error saving progress:", error);
    return false;
  }

  return true;
}
