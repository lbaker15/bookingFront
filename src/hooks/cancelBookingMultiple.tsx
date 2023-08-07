import { useContext, useMemo } from "react";
import { useQuery } from "react-query";
import { GraphQLClient, gql } from "graphql-request";
import { getCookie } from "../helpers/main";
import { Context } from "../store/store";

const token = getCookie("httpCookie");

const query2 = gql`
    mutation DeleteDataMultiple($input: [DeleteDataMultiple]!) {
        deleteDataMultiple(input: $input) {
            deletedCount
        }
    }
`;

export const CancelBookingMultiple = ({ ids, enabled, token }: any) => {
    const p: any = useContext(Context);

    const API_URL = `${p.state.mainUrl}/graphql`;

    const graphQLClient = new GraphQLClient(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ["cancelBookingMultiple", ids],
        queryFn: async () => {
            const data = await graphQLClient.request(query2, { input: ids });
            return data;
        },
        enabled: enabled,
    });

    // console.log('parent', isLoading, data, error);
    return { data, refetch, error };
};
