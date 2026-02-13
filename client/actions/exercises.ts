"use server";

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { Exercise } from "shared/exercise.schema";

// Check if admin is authenticated
async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get("admin_access")?.value === "true";
}

// Create admin Supabase client
function createAdminClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is missing!");
  }

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceRoleKey,
    {
      cookies: {
        getAll() {
          return [];
        },
        setAll() {},
      },
    },
  );
}

// Create regular Supabase client (for public reads)
async function createPublicClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    },
  );
}

// Database row type (snake_case)
interface ExerciseRow {
  id: string;
  lesson: number;
  difficulty: string;
  title: string | null;
  instructions: string;
  starter_code: string;
  expected_output: string;
  hint: string | null;
  hints: string[] | null;
  unlock_key: string | null;
  tag: string | null;
  concept: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// Convert database row to Exercise type
function rowToExercise(row: ExerciseRow): Exercise {
  return {
    id: row.id,
    lesson: row.lesson,
    difficulty: row.difficulty as Exercise["difficulty"],
    title: row.title ?? undefined,
    instructions: row.instructions,
    starterCode: row.starter_code,
    expectedOutput: row.expected_output,
    hint: row.hint ?? undefined,
    hints: row.hints ?? undefined,
    unlockKey: row.unlock_key ?? undefined,
    tag: row.tag ?? undefined,
    concept: row.concept as Exercise["concept"],
  };
}

// Convert Exercise to database row format (for insert/update)
function exerciseToRow(
  exercise: Partial<Exercise> & { id: string },
): Partial<ExerciseRow> & { id: string } {
  return {
    id: exercise.id,
    lesson: exercise.lesson,
    difficulty: exercise.difficulty,
    title: exercise.title ?? null,
    instructions: exercise.instructions,
    starter_code: exercise.starterCode,
    expected_output: exercise.expectedOutput,
    hint: exercise.hint ?? null,
    hints: exercise.hints ?? null,
    unlock_key: exercise.unlockKey ?? null,
    tag: exercise.tag ?? null,
    concept: exercise.concept ?? null,
  };
}

// ==================== Public API ====================

/**
 * Get all exercises (publicly readable)
 */
export async function getAllExercises(): Promise<Exercise[]> {
  const supabase = await createPublicClient();

  const { data, error } = await supabase
    .from("exercises")
    .select("*")
    .order("lesson", { ascending: true })
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching exercises:", error);
    return [];
  }

  return (data as ExerciseRow[]).map(rowToExercise);
}

/**
 * Get exercises for a specific lesson
 */
export async function getExercisesByLesson(
  lesson: number,
): Promise<Exercise[]> {
  const supabase = await createPublicClient();

  const { data, error } = await supabase
    .from("exercises")
    .select("*")
    .eq("lesson", lesson)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching exercises for lesson:", error);
    return [];
  }

  return (data as ExerciseRow[]).map(rowToExercise);
}

/**
 * Get a single exercise by ID
 */
export async function getExerciseById(id: string): Promise<Exercise | null> {
  const supabase = await createPublicClient();

  const { data, error } = await supabase
    .from("exercises")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching exercise:", error);
    return null;
  }

  return rowToExercise(data as ExerciseRow);
}

// ==================== Admin API ====================

/**
 * Create a new exercise (admin only)
 */
export async function createExercise(
  exercise: Omit<Exercise, "id"> & { id?: string },
): Promise<{ success: boolean; id?: string; error?: string }> {
  const isAdmin = await isAdminAuthenticated();
  if (!isAdmin) {
    return { success: false, error: "Unauthorized" };
  }

  const supabase = createAdminClient();

  // Generate ID if not provided
  const id =
    exercise.id ||
    `l${exercise.lesson}-${exercise.difficulty.charAt(0)}-${Date.now()}`;

  // Get the max sort_order for this lesson
  const { data: maxSortData } = await supabase
    .from("exercises")
    .select("sort_order")
    .eq("lesson", exercise.lesson)
    .order("sort_order", { ascending: false })
    .limit(1)
    .single();

  const nextSortOrder = (maxSortData?.sort_order ?? -1) + 1;

  const row = exerciseToRow({ ...exercise, id });

  const { error } = await supabase
    .from("exercises")
    .insert({ ...row, sort_order: nextSortOrder });

  if (error) {
    console.error("Error creating exercise:", error);
    return { success: false, error: error.message };
  }

  return { success: true, id };
}

/**
 * Update an existing exercise (admin only)
 */
export async function updateExercise(
  id: string,
  updates: Partial<Exercise>,
): Promise<{ success: boolean; error?: string }> {
  const isAdmin = await isAdminAuthenticated();
  if (!isAdmin) {
    return { success: false, error: "Unauthorized" };
  }

  const supabase = createAdminClient();

  // Convert Exercise fields to database columns
  const dbUpdates: Record<string, unknown> = {};
  if (updates.lesson !== undefined) dbUpdates.lesson = updates.lesson;
  if (updates.difficulty !== undefined)
    dbUpdates.difficulty = updates.difficulty;
  if (updates.title !== undefined) dbUpdates.title = updates.title;
  if (updates.instructions !== undefined)
    dbUpdates.instructions = updates.instructions;
  if (updates.starterCode !== undefined)
    dbUpdates.starter_code = updates.starterCode;
  if (updates.expectedOutput !== undefined)
    dbUpdates.expected_output = updates.expectedOutput;
  if (updates.hint !== undefined) dbUpdates.hint = updates.hint;
  if (updates.hints !== undefined) dbUpdates.hints = updates.hints;
  if (updates.unlockKey !== undefined) dbUpdates.unlock_key = updates.unlockKey;
  if (updates.tag !== undefined) dbUpdates.tag = updates.tag;
  if (updates.concept !== undefined) dbUpdates.concept = updates.concept;

  const { error } = await supabase
    .from("exercises")
    .update(dbUpdates)
    .eq("id", id);

  if (error) {
    console.error("Error updating exercise:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Delete an exercise (admin only)
 */
export async function deleteExercise(
  id: string,
): Promise<{ success: boolean; error?: string }> {
  const isAdmin = await isAdminAuthenticated();
  if (!isAdmin) {
    return { success: false, error: "Unauthorized" };
  }

  const supabase = createAdminClient();

  const { error } = await supabase.from("exercises").delete().eq("id", id);

  if (error) {
    console.error("Error deleting exercise:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Move an exercise to a different lesson (admin only)
 * This handles the reordering when dragging exercises between lessons
 */
export async function moveExerciseToLesson(
  exerciseId: string,
  targetLesson: number,
  newSortOrder: number,
): Promise<{ success: boolean; error?: string }> {
  const isAdmin = await isAdminAuthenticated();
  if (!isAdmin) {
    return { success: false, error: "Unauthorized" };
  }

  const supabase = createAdminClient();

  // Get the current exercise
  const { data: currentExercise, error: fetchError } = await supabase
    .from("exercises")
    .select("*")
    .eq("id", exerciseId)
    .single();

  if (fetchError || !currentExercise) {
    return { success: false, error: "Exercise not found" };
  }

  const oldLesson = currentExercise.lesson;

  // Simple approach: just update the exercise's lesson and sort_order
  // The sort_order will be normalized by reorderExercisesInLesson
  const { error } = await supabase
    .from("exercises")
    .update({ lesson: targetLesson, sort_order: newSortOrder })
    .eq("id", exerciseId);

  if (error) {
    console.error("Error moving exercise:", error);
    return { success: false, error: error.message };
  }

  // Normalize sort orders in both lessons
  await normalizeLessonSortOrder(supabase, targetLesson);
  if (oldLesson !== targetLesson) {
    await normalizeLessonSortOrder(supabase, oldLesson);
  }

  return { success: true };
}

/**
 * Helper function to normalize sort_order values in a lesson
 */
async function normalizeLessonSortOrder(
  supabase: ReturnType<typeof createAdminClient>,
  lesson: number,
) {
  const { data: exercises } = await supabase
    .from("exercises")
    .select("id, sort_order")
    .eq("lesson", lesson)
    .order("sort_order", { ascending: true });

  if (!exercises || exercises.length === 0) return;

  // Update each exercise with sequential sort_order
  for (let i = 0; i < exercises.length; i++) {
    if (exercises[i].sort_order !== i) {
      await supabase
        .from("exercises")
        .update({ sort_order: i })
        .eq("id", exercises[i].id);
    }
  }
}

/**
 * Reorder exercises within a lesson (admin only)
 * Takes an array of exercise IDs in the new order
 */
export async function reorderExercisesInLesson(
  lesson: number,
  exerciseIds: string[],
): Promise<{ success: boolean; error?: string }> {
  const isAdmin = await isAdminAuthenticated();
  if (!isAdmin) {
    return { success: false, error: "Unauthorized" };
  }

  const supabase = createAdminClient();

  // Update each exercise with its new sort_order
  const updates = exerciseIds.map((id, index) =>
    supabase
      .from("exercises")
      .update({ sort_order: index })
      .eq("id", id)
      .eq("lesson", lesson),
  );

  const results = await Promise.all(updates);
  const hasError = results.some((r) => r.error);

  if (hasError) {
    console.error("Error reordering exercises");
    return { success: false, error: "Failed to reorder some exercises" };
  }

  return { success: true };
}

/**
 * Bulk import exercises (admin only)
 * Useful for seeding or migrating from file-based exercises
 */
export async function bulkImportExercises(
  exercises: Exercise[],
): Promise<{ success: boolean; imported: number; error?: string }> {
  const isAdmin = await isAdminAuthenticated();
  if (!isAdmin) {
    return { success: false, imported: 0, error: "Unauthorized" };
  }

  const supabase = createAdminClient();

  // Group exercises by lesson to assign sort_order
  const byLesson = new Map<number, Exercise[]>();
  for (const ex of exercises) {
    const list = byLesson.get(ex.lesson) || [];
    list.push(ex);
    byLesson.set(ex.lesson, list);
  }

  // Prepare rows with sort_order
  const rows: (Partial<ExerciseRow> & { id: string; sort_order: number })[] =
    [];
  for (const [, lessonExercises] of byLesson.entries()) {
    lessonExercises.forEach((ex, index) => {
      const row = exerciseToRow(ex);
      rows.push({ ...row, sort_order: index } as Partial<ExerciseRow> & {
        id: string;
        sort_order: number;
      });
    });
  }

  const { error } = await supabase
    .from("exercises")
    .upsert(rows, { onConflict: "id" });

  if (error) {
    console.error("Error bulk importing exercises:", error);
    return { success: false, imported: 0, error: error.message };
  }

  return { success: true, imported: rows.length };
}

/**
 * Get all lessons (unique lesson numbers)
 */
export async function getAllLessons(): Promise<number[]> {
  const supabase = await createPublicClient();

  const { data, error } = await supabase
    .from("exercises")
    .select("lesson")
    .order("lesson", { ascending: true });

  if (error) {
    console.error("Error fetching lessons:", error);
    return [];
  }

  // Get unique lesson numbers
  const lessons = [...new Set(data.map((d) => d.lesson))];
  return lessons;
}

/**
 * Bulk move exercises to a different lesson (admin only)
 */
export async function bulkMoveExercisesToLesson(
  exerciseIds: string[],
  targetLesson: number,
): Promise<{ success: boolean; error?: string }> {
  const isAdmin = await isAdminAuthenticated();
  if (!isAdmin) {
    return { success: false, error: "Unauthorized" };
  }

  const supabase = createAdminClient();

  // Get affected source lessons for normalization
  const { data: exercises } = await supabase
    .from("exercises")
    .select("lesson")
    .in("id", exerciseIds);

  const sourceLessons = new Set(exercises?.map((e) => e.lesson) || []);

  // Get current max sort_order in target lesson
  const { data: targetExercises } = await supabase
    .from("exercises")
    .select("sort_order")
    .eq("lesson", targetLesson)
    .order("sort_order", { ascending: false })
    .limit(1);

  const startSortOrder = (targetExercises?.[0]?.sort_order ?? -1) + 1;

  // Update all exercises to target lesson
  const updates = exerciseIds.map((id, index) =>
    supabase
      .from("exercises")
      .update({ lesson: targetLesson, sort_order: startSortOrder + index })
      .eq("id", id),
  );

  const results = await Promise.all(updates);
  const hasError = results.some((r) => r.error);

  if (hasError) {
    console.error("Error bulk moving exercises");
    return { success: false, error: "Failed to move some exercises" };
  }

  // Normalize sort orders in all affected lessons
  for (const lesson of sourceLessons) {
    if (lesson !== targetLesson) {
      await normalizeLessonSortOrder(supabase, lesson);
    }
  }
  await normalizeLessonSortOrder(supabase, targetLesson);

  return { success: true };
}

/**
 * Bulk delete exercises (admin only)
 */
export async function bulkDeleteExercises(
  exerciseIds: string[],
): Promise<{ success: boolean; deleted: number; error?: string }> {
  const isAdmin = await isAdminAuthenticated();
  if (!isAdmin) {
    return { success: false, deleted: 0, error: "Unauthorized" };
  }

  const supabase = createAdminClient();

  // Get affected lessons for normalization
  const { data: exercises } = await supabase
    .from("exercises")
    .select("lesson")
    .in("id", exerciseIds);

  const affectedLessons = new Set(exercises?.map((e) => e.lesson) || []);

  const { error, count } = await supabase
    .from("exercises")
    .delete()
    .in("id", exerciseIds);

  if (error) {
    console.error("Error bulk deleting exercises:", error);
    return { success: false, deleted: 0, error: error.message };
  }

  // Normalize sort orders in affected lessons
  for (const lesson of affectedLessons) {
    await normalizeLessonSortOrder(supabase, lesson);
  }

  return { success: true, deleted: count || exerciseIds.length };
}
