import { TRPCRouter } from '@amzl/server/trpcRouter';
import { server } from '@amzl/utils/client/rootenv';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTRPCReact, httpBatchLink } from '@trpc/react-query';
import { useState } from 'react';

type TrpcProviderProps = {
	children: React.ReactNode;
};

export const trpcContext = createTRPCReact<TRPCRouter>();

export function TrpcProvider({ children }: TrpcProviderProps) {
	const [queryClient] = useState(() => new QueryClient());
	const [trpcClient] = useState(() =>
		trpcContext.createClient({
			links: [httpBatchLink({ url: `${server.origin}/trpc` })]
		})
	);

	return (
		<trpcContext.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</trpcContext.Provider>
	);
}
