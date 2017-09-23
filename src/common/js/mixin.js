export const managePageMixin = {
  data () {
    return {
      dialogVisible: false,
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now() - 8.64e7
        }
      }
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
