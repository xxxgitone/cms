export const managePageMixin = {
  data () {
    return {
      dialogVisible: false
    }
  },
  methods: {
    dialogShow () {
      this.dialogVisible = true
    },
    dialogHide () {
      this.dialogVisible = false
    }
  }
}
