import App from "./app";
import { render, screen, waitFor } from "@testing-library/react";
import { SWRConfig } from "swr";
import { server } from "./server";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders data from SWR hook", async () => {
	render(
		<SWRConfig value={{ provider: () => new Map() }}>
			<App />
		</SWRConfig>
	);

	await waitFor(() => {
		//expect(screen.getByText("Your mock data text")).toBeInTheDocument();
		screen.debug();
	});
});
