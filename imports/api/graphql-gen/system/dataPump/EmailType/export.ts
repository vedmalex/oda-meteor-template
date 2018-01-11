
export default {
  export: {
    queries: {
      EmailType: {
        query: 'EmailType/list.graphql',
        /*process: (f) => ({
          EmailType: f.viewer.emailTypes ? f.viewer.emailTypes.edges.map(e => ({
            ...e.node,
          })) : [],
        }),*/
      }
    }
  }
}