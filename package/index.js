import { Message } from 'element-ui'
import axios from 'axios'
import NpmComp from './index.vue'

const getFromSearchURL = k => {
	let v = null
	const searchStr = window.location.search
	if (searchStr.length > 1) {
		// 先拿到kv数组
		const searchList = searchStr.slice(1).split('&')
		searchList.forEach(kv => {
			const kvList = kv.split('=')
			if (kvList[0] === decodeURIComponent(k)) {
				v = decodeURIComponent(kvList[1])
			}
		})
	}
	return v
}
const constructionHTTPFun = (tokenField, baseURL) => {
	class ConstructionHTTP {
		constructor() {
			axios.defaults.baseURL = baseURL
		}

		// eslint-disable-next-line class-methods-use-this
		requestSuccess(config) {
			let token = ''
			if (sessionStorage.getItem(tokenField)) {
				token = sessionStorage.getItem(tokenField)
				token = token ? `${token}` : ''
			} else {
				token = getFromSearchURL('token')
				token = token ? `${token}` : ''
			}
			config.headers.Authorization = token
			return config
		}

		// eslint-disable-next-line class-methods-use-this
		requestFault(err) {
			return Promise.reject(err)
		}

		// eslint-disable-next-line class-methods-use-this
		responseSuccess(response) {
			if (response.data.code === 401 && window.isMessageREpate) {
				window.isMessageREpate = false
				// eslint-disable-next-line
				Message({
					message: '登陆认证已过期,请重新登陆！',
					type: 'warning',
				})
				sessionStorage.removeItem(tokenField)
				window.top.location.href = `${window.top.location.origin}/login`
				// window.top.location.href = '/login.html';
			} else if (response.data.code !== 200 && response.data.code !== 201) {
				window.top.postMessage(
					{
						message: response.data.msg,
						type: 'warning',
						wti_type: 'message',
					},
					'*',
				)
			}
			return response.data
		}

		// eslint-disable-next-line class-methods-use-this
		responseFault(error) {
			window.top.postMessage(
				{
					message: '您的网络连接失败，请稍后再试',
					type: 'warning',
					wti_type: 'message',
				},
				'*',
			)
			return Promise.reject(error.response.data)
		}

		generateAxios(config) {
			const newAxios = axios.create(config)
			newAxios.interceptors.request.use(this.requestSuccess, this.requestFault)
			newAxios.interceptors.response.use(this.responseSuccess, this.responseFault)
			return newAxios
		}
	}

	const HTTP = new ConstructionHTTP()
	const post = (url, data, params) => {
		const myAxios = HTTP.generateAxios()
		return myAxios({
			method: 'post',
			url,
			params,
			data,
			timeout: 1000 * 30,
		})
	}
	const get = (url, params, data) => {
		const myAxios = HTTP.generateAxios()
		return myAxios({
			method: 'get',
			url,
			data,
			params,
			timeout: 1000 * 30,
		})
	}

	const documentFlow = (url, data, responseType) => {
		const myAxios = HTTP.generateAxios()
		return myAxios({
			method: 'post',
			url,
			data,
			responseType,
			timeout: 1000 * 600,
		})
	}
	const generateAxios = config => {
		const myAxios = HTTP.generateAxios()
		return myAxios(config)
	}
	return { post, get, generateAxios, documentFlow }
}

export default {
	// installOptions：根据自己实际需求去确认是否需要，或者字段等...
	install: (Vue, installOptions = {}) => {
		const { post, get, generateAxios, documentFlow } = constructionHTTPFun(
			installOptions.tokenField,
			installOptions.baseURL,
		)
		console.log(post, get, generateAxios, documentFlow)
		Vue.component(NpmComp.name, NpmComp)
	},
}
