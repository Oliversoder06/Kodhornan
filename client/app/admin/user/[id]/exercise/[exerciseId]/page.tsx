"use client";

import { useParams } from "next/navigation";
import { ExerciseProvider } from "@/context/ExerciseContext";
import { ReadOnlyExerciseView } from "@/components/ReadOnlyExerciseView";

export default function AdminExercisePage() {
  const params = useParams();
  const userId = params.id as string;
  const exerciseId = params.exerciseId as string;

  return (
    <ExerciseProvider 
      forcedUserId={userId} 
      readOnly={true} 
      basePath={`/admin/user/${userId}/exercise`}
    >
      <ReadOnlyExerciseView exerciseId={exerciseId} userId={userId} />
    </ExerciseProvider>
  );
}
