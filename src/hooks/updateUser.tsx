import { useContext, useMemo } from "react";
import { useQuery } from "react-query";
import { GraphQLClient, gql } from "graphql-request";
import { Context, State } from "../store/store";

export const UpdateUser = ({ dataI, userId }: any) => {
    const { state }: State = useContext(Context);

    const API_URL = `${state.mainUrl}/graphql`;

    const graphQLClient = new GraphQLClient(API_URL, {
        headers: {},
    });

    const query3 = gql`
        mutation updateUser($input: EditUser!) {
            updateUser(input: $input) {
                _id
                data {
                    _id
                }
            }
        }
    `;
    const input = { data: dataI, userId };

    const { isLoading, error, data } = useQuery(
        ["editUserData", input],
        async () => {
            const data = await graphQLClient.request(query3, { input });
            return data;
        }
    );

    if (isLoading) return "loading";
    if (error) return "error";
    return data;
};
