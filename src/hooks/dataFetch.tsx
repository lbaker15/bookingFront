import { useMemo, useContext } from "react";
import { useQuery } from "react-query";
import { GraphQLClient, gql } from "graphql-request";
import { Context, State } from "../store/store";

const API_URL = `http://localhost:4000/graphql`;
const graphQLClient = new GraphQLClient(API_URL, {
    headers: {},
});

const query2 = gql`
    query {
        users {
            _id
            data {
                _id
                title
            }
        }
    }
`;

export const DataHookGlobal = () => {
    const { isLoading, error, data } = useQuery(["query"], async () => {
        const data = await graphQLClient.request(query2);
        return data;
    });

    const cachedMutatedData = useMemo(() => {
        if (isLoading || error) return null;

        // mutate data here
        return data;
    }, [data]);

    if (isLoading) return "loading";
    if (error) return "error";
    return cachedMutatedData;
};
