import { ApolloClient , createHttpLink , InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httplink = createHttpLink({
    uri: "http://localhost:5000/graphql/"
});

const authLink = setContext((_,{headers}) => {
    return {
        headers: {
            ...headers,
            authorization:localStorage.getItem("token") || ""
        }
    }
})

const client = new ApolloClient({
    link:authLink.concat(httplink),
    cache: new InMemoryCache()
});

export default client;