import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.accounts)["bulk-delete"]["$post"]>;
type RequestType = InferRequestType<(typeof client.api.accounts)["bulk-delete"]["$post"]>["json"];

export const useDeleteBulkAccount = () => {
  const queryClient = useQueryClient();
  const mutations = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.accounts["bulk-delete"]["$post"]({ json });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Account Deleted");
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
    },
    onError: () => {
      toast.error("Failed to delete account");
    },
  });
  return mutations;
};
