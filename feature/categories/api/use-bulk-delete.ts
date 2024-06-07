import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.categories)["bulk-delete"]["$post"]>;
type RequestType = InferRequestType<(typeof client.api.categories)["bulk-delete"]["$post"]>["json"];

export const useDeleteBulkCategory = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.categories["bulk-delete"]["$post"]({ json });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Category Deleted");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
    },
    onError: () => {
      toast.error("Failed to delete Category");
    },
  });
  return mutation;
};
