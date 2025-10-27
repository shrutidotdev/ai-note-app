// hooks/useCurrentUser.ts

import { useConvexAuth } from "convex/react";

export function useCurrentUser() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  
  return {
    isAuthenticated,
    isLoading,
  };
}
