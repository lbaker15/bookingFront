import { useContext, useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import { GraphQLClient, gql } from "graphql-request";
import { getCookie } from "../helpers/main";
import { Context, State } from "../store/store";

const query2 = gql`
    query BookingsPage($page: Int) {
        bookingsPage(page: $page) {
            count
            hasMore
            eventTotals
            results {
                _id
                title
                multipleBooking
                pi

                user {
                    name
                    email
                }
                event {
                    _id
                    name
                    tickets
                }
            }
        }
    }
`;

export const GetBookingsPage = ({ token, dispatch }: any) => {
    const p: State = useContext(Context);
    let page = p?.state?.scroll;

    const API_URL = `${p.state.mainUrl}/graphql`;
    const graphQLClient = new GraphQLClient(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const { isLoading, refetch, error, data } = useQuery(
        ["getBookingsPage", page],
        async () => {
            const data = await graphQLClient.request(query2, { page });
            return data;
        }
    );
    useEffect(() => {
        const d: any = data;
        if (d) {
            dispatch({
                type: "scrollData",
                payload: {
                    data: d.bookingsPage.results,
                    hasMore: d.bookingsPage.hasMore,
                    eventTotals: d.bookingsPage.eventTotals,
                },
            });
        }
    }, [data]);
    return { isLoading, refetch, error, data };
};
