import { trpcContext } from '@amzl/react-components';

export function QueryTest() {
	const data = trpcContext.form.submit.useQuery();

	return (
		<>
			<div className="max-w-5xl break-words mx-auto">
				<p>Some temporary sample data from the backend:</p>
				<br />
				<code>{JSON.stringify(data)}</code>
			</div>
		</>
	);
}
