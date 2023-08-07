import { useMemo, useContext } from "react";
import { useQuery } from "react-query";
import { GraphQLClient, gql } from "graphql-request";
import { getCookie } from "../helpers/main";
import { Context, State } from "../store/store";

const query2 = gql`
    mutation CreateUser($input: CreateUser!) {
        createUser(input: $input) {
            _id
        }
    }
`;

export const CreateUserH = ({ final, enabled }: any) => {
    const { state }: State = useContext(Context);

    const API_URL = `${state.mainUrl}/graphql`;

    const graphQLClient = new GraphQLClient(API_URL, {
        headers: {},
    });
    const input = final;
    console.log(final);

    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ["createUser", input],
        queryFn: async () => {
            const data = await graphQLClient.request(query2, { input });
            return data;
        },
        enabled: enabled,
    });

    return { data, refetch, error };
};
