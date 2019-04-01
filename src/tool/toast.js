/**
 * Created by nirr on 2019/2/11.
 */
import { Toast as TT } from 'mint-ui'

let toast = null

export function Toast (message, position, duration) {
  return new Promise(function (resolve, reject) {
    if (!toast) {
      toast = TT({
        message: message,
        position: position || 'middle'
      })
      setTimeout(() => {
        toast.close()
        toast = null
        resolve()
      }, duration || 2000)
    }
  })
}

export default Toast
