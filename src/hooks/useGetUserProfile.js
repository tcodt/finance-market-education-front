import { userProfile } from "@/services/users";
import { useQuery } from "@tanstack/react-query";

export const useGetUserProfile = () => {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: userProfile,
    retry: false,
  });
};
