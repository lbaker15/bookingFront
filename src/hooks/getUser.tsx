import { useContext, useMemo } from "react";
import { useQuery } from "react-query";
import { GraphQLClient, gql } from "graphql-request";
import { Context, State } from "../store/store";

export const GetUser = (id: any) => {
    const { state }: State = useContext(Context);

    const API_URL = `${state.mainUrl}/graphql`;

    const graphQLClient = new GraphQLClient(API_URL, {
        headers: {},
    });

    const query2 = gql`
        query user($id: ID!) {
            user(id: $id) {
                _id
            }
        }
    `;

    const { isLoading, error, data } = useQuery(["queryUser", id], async () => {
        const data = await graphQLClient.request(query2, { id });
        return data;
    });
    console.log("parent", isLoading, data, error);
    if (isLoading) return "loading";
    if (error) return "error";
    return data;
};
