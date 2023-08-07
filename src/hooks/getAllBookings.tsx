import { useContext, useMemo } from "react";
import { useQuery } from "react-query";
import { GraphQLClient, gql } from "graphql-request";
import { getCookie } from "../helpers/main";
import { Context, State } from "../store/store";

const query2 = gql`
    query {
        data {
            _id
            title
            event {
                _id
                name
                tickets
            }
        }
    }
`;

export const GetBookingsUser = ({ token }: any) => {
    const { state }: State = useContext(Context);

    const API_URL = `${state.mainUrl}/graphql`;

    const graphQLClient = new GraphQLClient(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const { isLoading, error, data } = useQuery(
        ["getBookingsUser"],
        async () => {
            const data = await graphQLClient.request(query2);

            return data;
        }
    );

    // console.log('parent', isLoading, data, error);
    if (isLoading) return "loading";
    if (error) return "error";
    return data;
};
