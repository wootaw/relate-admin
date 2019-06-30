export default {
  computed: {
    routeQuery () {
      const q = this.$route.query
      return q === undefined ? null : this.queryValues(q)
    }
  },
  
  methods: {
    updateQuery (fields, values) {
      const q = { '_page': 1 }
      if (values !== null) {
        fields.forEach((f, i) => {
          if (values[i] === undefined) {
            delete q[f]
          } else {
            q[f] = values[i]
          }
        })
      }
      return q
    }
  }
}
