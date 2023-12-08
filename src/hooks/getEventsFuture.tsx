import { useContext, useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import { GraphQLClient, gql } from "graphql-request";
import { getCookie } from "../helpers/main";
import { Context } from "../store/store";

const query2 = gql`
    query eventsFuture($input: EventFutureInput!) {
        eventsFuture(input: $input) {
            images
            hasMore
            count
            results {
                _id
                name
                time
                description
                address
                category
                lat
                lng
                imgUrl
                price
                bookings {
                    _id
                    title
                }
            }
        }
    }
`;

export const GetEventsFuture = ({  timestamp, dispatch }: any) => {
    const p: any = useContext(Context);

    const input = { timestamp, num: p.state.scroll };

    const API_URL = `${p.state.mainUrl}/graphql`;
    const graphQLClient = new GraphQLClient(API_URL, {
        headers: {
            // Authorization: `Bearer ${token}`,
        },
    });
    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ["getEventsFuture", input],
        queryFn: async () => {
            const data = await graphQLClient.request(query2, { input });
            return data;
        },
    });

    useEffect(() => {
        const d: any = data;
        if (
            d &&
            !isLoading &&
            !error &&
            d.eventsFuture &&
            d.eventsFuture.results
        ) {
            dispatch({
                type: "displayData",
                payload: {
                    data: d.eventsFuture.results,
                    hasMore: d.eventsFuture.hasMore,
                },
            });
        }
    }, [data]);

    return { data, refetch, error, isLoading };
};
