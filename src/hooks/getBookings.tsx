import { useContext, useMemo } from "react";
import { useQuery } from "react-query";
import { GraphQLClient, gql } from "graphql-request";
import { getCookie } from "../helpers/main";
import { Context, State } from "../store/store";

const query2 = gql`
    query userEvent {
        userEvent {
            _id
            name
            time
            description
            address
            time
            imgUrl
            lat
            lng
            userBookingId
        }
    }
`;

export const GetBookings = ({ token }: any) => {
    const { state }: State = useContext(Context);

    const API_URL = `${state.mainUrl}/graphql`;

    console.log("get bookings");
    const graphQLClient = new GraphQLClient(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const { isLoading, error, data, refetch } = useQuery(
        ["getBookingsUser"],
        async () => {
            const data = await graphQLClient.request(query2);

            return data;
        }
    );

    // console.log('parent', isLoading, data, error);
    const cachedData = useMemo(() => {
        const d: any = data;
        if (d) {
            if (d.userEvent) {
                const arr: any = [];
                d.userEvent.map((item: any, i: any) => {
                    item.count = 1;
                    item.userBookingIds = [item.userBookingId];
                    if (!arr.find((item2: any) => item2._id === item._id)) {
                        arr.push(item);
                    } else {
                        const index = arr.indexOf(
                            arr.find((item2: any) => item2._id === item._id)
                        );
                        arr[index].count = arr[index].count + 1;
                        arr[index].userBookingIds = arr[
                            index
                        ].userBookingIds.concat(item.userBookingId);
                    }
                });
                return arr;
            }
        }
    }, [data]);
    return { data: cachedData, refetch, isLoading, error };
};
