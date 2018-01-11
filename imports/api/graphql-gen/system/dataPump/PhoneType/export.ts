
export default {
  export: {
    queries: {
      PhoneType: {
        query: 'PhoneType/list.graphql',
        /*process: (f) => ({
          PhoneType: f.viewer.phoneTypes ? f.viewer.phoneTypes.edges.map(e => ({
            ...e.node,
          })) : [],
        }),*/
      }
    }
  }
}