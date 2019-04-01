import { Indicator } from 'mint-ui'

const loading = {
  show () {
    Indicator.open({
      spinnerType: 'fading-circle'
    })
  },
  hide () {
    clearTimeout(loading.time)
    loading.time = setTimeout(function () {
      Indicator.close()
    }, 500)
  },
  time: 0
}

export default loading
