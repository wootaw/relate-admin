import FilterBox from '@/components/filter'

export default {
  components: {
    FilterBox
  },

  computed: {
    routeName () {
      return this.$route.name
    },

    values () {
      return Object.values(this.filters).filter(v => v !== null)
    }
  },
  
  methods: {
    changeRouteQuery (name) {
      const params = Object.keys(this.filters).reduce((r, c) => {
        if (this.filters[c] !== null) {
          r[c] = this.filters[c]
        }
        return r
      }, {})
      this.$router.replace({ name: name, query: params })
    },

    onClear () {
      Object.keys(this.filters).map((f) => this.filters[f] = null)
    }
  },
}
