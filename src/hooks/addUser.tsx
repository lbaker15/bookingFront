import { useContext, useMemo } from "react";
import { useQuery } from "react-query";
import { GraphQLClient, gql } from "graphql-request";
import { Context } from "../store/store";

export const AddUser = ({ name, email, password }: any) => {
    const p: any = useContext(Context);

    const API_URL = `${p.state.mainUrl}/graphql`;

    const graphQLClient = new GraphQLClient(API_URL, {
        headers: {},
    });

    const query2 = gql`
        mutation createUser($input: CreateUser!) {
            createUser(input: $input) {
                _id
            }
        }
    `;
    const input = { name, email, password };
    const { isLoading, error, data } = useQuery(
        ["addUser", input],
        async () => {
            const data = await graphQLClient.request(query2, { input });
            return data;
        }
    );
    console.log("parent", isLoading, data, error);
    if (isLoading) return "loading";
    if (error) return "error";
    return data;
};
