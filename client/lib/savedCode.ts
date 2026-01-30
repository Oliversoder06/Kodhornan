import { supabase } from "./supabase";

/**
 * Saved Code - Autosave functionality
 * Persists user code per exercise
 */

/**
 * Output structure stored as JSON in the database
 */
export interface SavedOutput {
  state: 'success' | 'error' | '';
  output: string;
  technical_error: string | null;
  clarified_error: string | null;
}

/**
 * Save code for an exercise (called on code change with debounce).
 * Only saves the code - output is saved separately on RUN.
 */
export async function saveCode(
  userId: string,
  exerciseId: string,
  code: string
): Promise<boolean> {
  try {
    const { error: dbError } = await supabase.from("saved_code").upsert(
      {
        user_id: userId,
        exercise_id: exerciseId,
        code: code,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,exercise_id" }
    );

    if (dbError) throw dbError;
    return true;
  } catch (err) {
    console.error("Error saving code:", err);
    return false;
  }
}

/**
 * Save output for an exercise (called on RUN).
 * Saves the structured output as JSON.
 */
export async function saveOutput(
  userId: string,
  exerciseId: string,
  output: SavedOutput
): Promise<boolean> {
  try {
    const { error: dbError } = await supabase.from("saved_code").upsert(
      {
        user_id: userId,
        exercise_id: exerciseId,
        output: output,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,exercise_id" }
    );

    if (dbError) throw dbError;
    return true;
  } catch (err) {
    console.error("Error saving output:", err);
    return false;
  }
}

/**
 * Save both code and output together (used during RUN).
 */
export async function saveCodeAndOutput(
  userId: string,
  exerciseId: string,
  code: string,
  output: SavedOutput
): Promise<boolean> {
  try {
    const { error: dbError } = await supabase.from("saved_code").upsert(
      {
        user_id: userId,
        exercise_id: exerciseId,
        code: code,
        output: output,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,exercise_id" }
    );

    if (dbError) throw dbError;
    return true;
  } catch (err) {
    console.error("Error saving code and output:", err);
    return false;
  }
}

/**
 * Get saved code and output for an exercise.
 */
export async function getSavedCode(
  userId: string,
  exerciseId: string
): Promise<{ code: string; output: SavedOutput | null } | null> {
  try {
    const { data, error } = await supabase
      .from("saved_code")
      .select("code, output")
      .eq("user_id", userId)
      .eq("exercise_id", exerciseId)
      .maybeSingle(); // Use maybeSingle() instead of single() to handle no data gracefully

    if (error) {
      console.error("Supabase error fetching saved code:", error);
      return null;
    }
    
    if (!data) return null; // No saved code yet
    
    // Parse output JSON if it exists
    let parsedOutput: SavedOutput | null = null;
    if (data.output) {
      // Handle both old format (migrated data) and new format
      if (typeof data.output === 'string') {
        try {
          parsedOutput = JSON.parse(data.output);
        } catch {
          // Old plain text output - wrap it
          parsedOutput = {
            state: '',
            output: data.output,
            technical_error: null,
            clarified_error: null
          };
        }
      } else {
        parsedOutput = data.output as SavedOutput;
      }
    }
    
    return { 
      code: data.code || "", 
      output: parsedOutput
    };
  } catch (error) {
    console.error("Error fetching saved code:", error);
    return null;
  }
}

/**
 * Delete saved code for an exercise (on reset).
 */
export async function deleteSavedCode(
  userId: string,
  exerciseId: string
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("saved_code")
      .delete()
      .eq("user_id", userId)
      .eq("exercise_id", exerciseId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error deleting saved code:", error);
    return false;
  }
}
