import { useContext, useMemo } from "react";
import { useQuery } from "react-query";
import { GraphQLClient, gql } from "graphql-request";
import { getCookie } from "../helpers/main";
import { Context } from "../store/store";

const token = getCookie("httpCookie");

const query2 = gql`
    mutation ChangePassword($input: ChangePassword!) {
        changePassword(input: $input) {
            _id
        }
    }
`;

export const ChangePassword = ({ input, enabled, token }: any) => {
    const { state }: any = useContext(Context);

    const API_URL = `${state.mainUrl}/graphql`;

    const graphQLClient = new GraphQLClient(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ["changePassword", input],
        queryFn: async () => {
            const data = await graphQLClient.request(query2, { input });
            return data;
        },
        enabled: enabled,
    });

    // console.log('parent', isLoading, data, error);
    return { data, refetch, error };
};
