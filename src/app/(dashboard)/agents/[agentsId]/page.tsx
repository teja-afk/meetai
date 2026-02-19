import {
  AgentIdView,
  AgentIdViewError,
  AgentIdViewLoading
} from "@/modules/agents/ui/views/agent-id-view";

import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  params: Promise<{ agentsId: string }>
};

const Page = async ({ params }: Props) => {
  const { agentsId } = await params;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    trpc.agents.getOne.queryOptions({ id: agentsId })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<AgentIdViewLoading />}>
        <ErrorBoundary fallback={<AgentIdViewError />}>
          <AgentIdView agentId={agentsId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
}
export default Page;
