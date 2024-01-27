// import axios, { AxiosError } from 'axios'
// import { MessageBox } from '../../components/message-box/MessageBox'
// import { PageURL, STATUS_CODE, URLs } from '../../constants'
// import { history } from '../../helpers/history'
// import { localStorageHelper } from '../../helpers/local-storage'

// const cancelToken = axios.CancelToken.source()

// export function handleException(error: AxiosError) {
//   const status = error.response?.status
//   const isLoginUrl = error.config.url === URLs.AUTH.LOGIN

//   switch (status) {
//     case STATUS_CODE.UNAUTHORIZED:
//       if (isLoginUrl) {
//         MessageBox.Error(error.response?.data.msg)
//       } else {
//         localStorageHelper.remove('access_token')
//         localStorageHelper.remove('refresh_token')
//         localStorageHelper.remove('tenant_id')
//         MessageBox.Error(error.response?.statusText ?? '')
//         history.push(PageURL.LOGIN)
//       }
//       cancelToken.cancel()
//       break
//     case STATUS_CODE.BAD_REQUEST:
//       break
//     case STATUS_CODE.FORBIDDEN:
//       if (isLoginUrl) {
//         MessageBox.Error('toast-invalid-user')
//       }
//       break
//     case STATUS_CODE.INTERNAL_SERVER_ERROR:
//       MessageBox.Error(error.response?.statusText as string)
//       break
//     default:
//       break
//   }
// }

export { }