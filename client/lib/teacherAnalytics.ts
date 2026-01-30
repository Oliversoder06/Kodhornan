import { supabase } from "./supabase";

/**
 * Teacher Analytics - Track student progress data
 * Hidden behind ?teacher=1 query param
 */

interface ExerciseAnalytics {
  exercise_id: string;
  attempt_count: number;
  time_spent_seconds: number;
  hints_used: number;
  last_attempt_at: string;
}

/**
 * Track an attempt on an exercise.
 * Increments attempt count.
 */
export async function trackAttempt(
  userId: string,
  exerciseId: string
): Promise<void> {
  try {
    // First get existing analytics
    const { data: existing } = await supabase
      .from("exercise_analytics")
      .select("attempt_count")
      .eq("user_id", userId)
      .eq("exercise_id", exerciseId)
      .maybeSingle();

    const newAttemptCount = (existing?.attempt_count || 0) + 1;

    await supabase.from("exercise_analytics").upsert(
      {
        user_id: userId,
        exercise_id: exerciseId,
        attempt_count: newAttemptCount,
        last_attempt_at: new Date().toISOString(),
      },
      { onConflict: "user_id,exercise_id" }
    );
  } catch (error) {
    console.error("Error tracking attempt:", error);
  }
}

/**
 * Track time spent on an exercise.
 * Adds to cumulative time spent.
 */
export async function trackTimeSpent(
  userId: string,
  exerciseId: string,
  additionalSeconds: number
): Promise<void> {
  try {
    const { data: existing } = await supabase
      .from("exercise_analytics")
      .select("time_spent_seconds")
      .eq("user_id", userId)
      .eq("exercise_id", exerciseId)
      .maybeSingle();

    const newTimeSpent = (existing?.time_spent_seconds || 0) + additionalSeconds;

    await supabase.from("exercise_analytics").upsert(
      {
        user_id: userId,
        exercise_id: exerciseId,
        time_spent_seconds: newTimeSpent,
      },
      { onConflict: "user_id,exercise_id" }
    );
  } catch (error) {
    console.error("Error tracking time:", error);
  }
}

/**
 * Track hint usage on an exercise.
 * Increments hints used count.
 */
export async function trackHintUsed(
  userId: string,
  exerciseId: string
): Promise<void> {
  try {
    const { data: existing } = await supabase
      .from("exercise_analytics")
      .select("hints_used")
      .eq("user_id", userId)
      .eq("exercise_id", exerciseId)
      .maybeSingle();

    const newHintsUsed = (existing?.hints_used || 0) + 1;

    await supabase.from("exercise_analytics").upsert(
      {
        user_id: userId,
        exercise_id: exerciseId,
        hints_used: newHintsUsed,
      },
      { onConflict: "user_id,exercise_id" }
    );
  } catch (error) {
    console.error("Error tracking hint:", error);
  }
}

/**
 * Get all analytics for a user (Teacher Mode view).
 */
export async function getAnalytics(
  userId: string
): Promise<ExerciseAnalytics[]> {
  try {
    const { data, error } = await supabase
      .from("exercise_analytics")
      .select("exercise_id, attempt_count, time_spent_seconds, hints_used, last_attempt_at")
      .eq("user_id", userId)
      .order("last_attempt_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return [];
  }
}

/**
 * Get analytics for a specific exercise.
 */
export async function getExerciseAnalytics(
  userId: string,
  exerciseId: string
): Promise<ExerciseAnalytics | null> {
  try {
    const { data, error } = await supabase
      .from("exercise_analytics")
      .select("exercise_id, attempt_count, time_spent_seconds, hints_used, last_attempt_at")
      .eq("user_id", userId)
      .eq("exercise_id", exerciseId)
      .maybeSingle();

    if (error) return null;
    return data;
  } catch (error) {
    console.error("Error fetching exercise analytics:", error);
    return null;
  }
}
