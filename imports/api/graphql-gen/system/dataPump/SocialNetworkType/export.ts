
export default {
  export: {
    queries: {
      SocialNetworkType: {
        query: 'SocialNetworkType/list.graphql',
        /*process: (f) => ({
          SocialNetworkType: f.viewer.socialNetworkTypes ? f.viewer.socialNetworkTypes.edges.map(e => ({
            ...e.node,
          })) : [],
        }),*/
      }
    }
  }
}