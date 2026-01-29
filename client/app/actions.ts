'use server';

// Architecture Update:
// Generated exercises are now handled entirely in client-side state.
// No file system operations are permitted for generating/deleting exercises.

export async function generateLesson(day: number) {
  return { success: false, message: 'Deprecated: Generation is now client-side only.' };
}

export async function deleteLesson(id: string) {
  return { success: false, message: 'Deprecated: Deletion is now client-side only.' };
}

export async function regenerateLesson(id: string, day: number) {
  return { success: false, message: 'Deprecated: Regeneration is now client-side only.' };
}
