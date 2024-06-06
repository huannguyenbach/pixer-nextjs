import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";

export const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: "animesearch",
    nodes: [
      {
        host: "localhost",
        port: "8108",
        protocol: "http",
      },
    ],
  },
  additionalSearchParameters: {
    query_by: "title,synopsis,genre",
    query_by_weights: "4,2,1",
    num_typos: 3,
    typo_tokens_threshold: 1,
  },
});