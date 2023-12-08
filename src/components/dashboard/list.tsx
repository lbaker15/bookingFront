import React from "react";
import { sortByValues } from "../../helpers/main";
import Event from "./event";
import InfiniteScroll from "react-infinite-scroller"; //new
import { EventListProps } from "./types";
import Loader from "./loader";

interface EventTime {
	_id: string;
	name: string;
	time: number;
	lat?: number;
	lng?: number;
	address?: string;
	category: string[];
	description?: string;
	tickets: number;
	image?: string;
	imgUrl?: string;
	price: string;
}
const List = React.memo(
	({ data, hasMore, dispatch, sortBy, filterBy }: EventListProps) => {
		const loading = () => {
			dispatch({ type: "scroll" });
		};

		return (
			<div className="py-10">
				<InfiniteScroll
					className="grid grid-cols-12 gap-8 py-8 overflow-hidden u-wrapper"
					loader={
						<div className="col-span-12" key={0}>
							<Loader disableHeight={true} fixed={false} />
						</div>
					}
					loadMore={loading}
					hasMore={hasMore}
				>
					{data &&
						!sortBy &&
						data
							.filter((item) => {
								return filterBy
									? item.category
											.map((cat: string) => cat.toLowerCase())
											.includes(String(filterBy).toLowerCase())
									: true;
							})
							.map((item, i) => {
								return (
									<Event bookings={false} key={"event2" + i} item={item} />
								);
							})}
					{data &&
						sortBy === sortByValues[0] &&
						data
							.sort((a: EventTime, b: EventTime) => b.time - a.time)
							.filter((item) => {
								return filterBy
									? item.category
											.map((cat: string) => cat.toLowerCase())
											.includes(String(filterBy).toLowerCase())
									: true;
							})
							.map((item, i) => {
								return (
									<Event bookings={false} key={"event2" + i} item={item} />
								);
							})}
					{data &&
						sortBy === sortByValues[1] &&
						data
							.sort((a: EventTime, b: EventTime) => a.time - b.time)
							.filter((item) => {
								return filterBy
									? item.category
											.map((cat: string) => cat.toLowerCase())
											.includes(String(filterBy).toLowerCase())
									: true;
							})
							.map((item, i) => {
								return (
									<Event bookings={false} key={"event2" + i} item={item} />
								);
							})}
				</InfiniteScroll>
			</div>
		);
	}
);

export default List;
