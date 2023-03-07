import { API_CONFIG_ } from '~/config/config'
import { VAxios } from './VAxios'

export const Axios = new VAxios(API_CONFIG_[(process as unknown as Process).env.NODE_ENV].baseUrl)
