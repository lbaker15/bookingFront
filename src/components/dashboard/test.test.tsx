import React from "react";
import { render, act } from "@testing-library/react";
import { useLocation } from "react-router-dom";
import { Context, DispatchContext } from "../../store/store";
import ListWrapper from "./listWrapper";
import List from "./list";

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useLocation: jest.fn(),
}));

const data = [
	{
		address: "321 fake st",
		bookings: [{}],
		category: ["one"],
		description: "Description",
		imgUrl:
			"/9j/4AAQSkZJRgABAgEAkACQAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDAREAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD/AD/6AP/Z",
		lat: 43243,
		lng: 432432,
		name: "Event One",
		price: "Price Two",
		time: 43244,
		_id: "648b77e29764228478168780",
		tickets: 2,
	},
	{
		tickets: 2,
		address: "321 fake st",
		bookings: [{}],
		category: ["two"],
		description: "Description",
		imgUrl:
			"/9j/4AAQSkZJRgABAgEAkACQAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDAREAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD/AD/6AP/Z",
		lat: 43243,
		lng: 432432,
		name: "Event Two",
		price: "Price Two",
		time: 43244,
		_id: "648b77e29764228478168780",
	},
];

describe("ListWrapper", () => {
	it("dispatches the correct action when URL has ?filter=one", () => {
		(useLocation as jest.Mock).mockImplementation(() => ({
			search: "?filter=one",
		}));

		const mockDispatch = jest.fn();

		render(
			<Context.Provider
				value={{
					state: {
						auth: "",
						menuState: false,
						scroll: 4,
						displayData: { ...data },
					},
				}}
			>
				<DispatchContext.Provider value={mockDispatch}>
					<ListWrapper />
				</DispatchContext.Provider>
			</Context.Provider>
		);

		expect(mockDispatch).toHaveBeenCalledWith({
			type: "category",
			payload: "one",
		});
	});
});

describe("List", () => {
	it('only displays data items with category "one" if filter is "one"', () => {
		const { queryByText } = render(
			<List
				data={data}
				hasMore={false}
				dispatch={() => {}}
				sortBy={null}
				filterBy="one"
			/>
		);

		expect(queryByText("Event One")).toBeInTheDocument();
		expect(queryByText("Event Two")).not.toBeInTheDocument();
	});
});
