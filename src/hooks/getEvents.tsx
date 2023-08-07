import { useContext, useMemo } from "react";
import { useQuery } from "react-query";
import { GraphQLClient, gql } from "graphql-request";
import { getCookie } from "../helpers/main";
import { Context, ContextProvider } from "../store/store";

const query2 = gql`
    query {
        events {
            _id
            name
            time
            description
            address
            lat
            lng
            bookings {
                _id
                title
            }
        }
    }
`;

export const GetEvents = async ({ token }: any) => {
    const state = useContext(Context);

    const API_URL = `${state.state.mainUrl}/graphql`;
    const graphQLClient = new GraphQLClient(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const { isLoading, error, data } = useQuery(["getEvents"], async () => {
        const data = await graphQLClient.request(query2);

        return data;
    });

    // console.log('parent', isLoading, data, error);
    if (isLoading) return "loading";
    if (error) return "error";
    return data;
};
