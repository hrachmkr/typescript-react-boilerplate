import { objToQs } from 'helpers'

type ApiFactoryParams = {
  [x: string]: string | number | null
}

type ApiFactoryClassParams = {
  path: string
}

type IAPIResponse<T> = {
  status: number
  message: string
  data: T
}

// TODO find a way to fix successHandler types
class ApiFactory<T, P> {
  apiCall = ''

  constructor(params?: ApiFactoryClassParams) {
    if (params) {
      const { path } = params
      this.apiCall = path
    }
  }

  setApiCall(path: string): void {
    this.apiCall = path
  }

  apiFetcher<T>(
    params: string,
    options: RequestInit = {
      credentials: 'include',
    }
  ): Promise<T> {
    return fetch(params, options).then((res) => res.json())
  }

  _getByURL(url: string): Promise<T | Error> {
    return (
      this.apiFetcher(url)
        // @ts-ignore
        .then(this.successHandler)
        .catch(this.errorHandler)
    )
  }

  /**
   * @param {string} params query string key value pairs.
   */
  get(params?: ApiFactoryParams): Promise<T | Error> {
    const queryString = params ? objToQs(params) : ''
    return this._getByURL(`${this.apiCall}${queryString}`)
  }

  /**
   * @param {*} param URL path parameters.
   */
  getWithParam(param: string | number): Promise<T | Error> {
    return this._getByURL(`${this.apiCall}/${param}`)
  }

  post(body: P): Promise<T | Error> {
    const options: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(body),
    }

    return (
      this.apiFetcher(`${this.apiCall}`, options)
        // @ts-ignore
        .then(this.successHandler)
        .catch(this.errorHandler)
    )
  }

  /**
   *
   * @param {Object} body
   * @param {number | string} param
   * @description Patch request which receives an object as its body and
   * params as its query parameters.
   */
  patch(body: P, param?: number | string): Promise<T | Error> {
    const options: RequestInit = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      method: 'PATCH',
      body: JSON.stringify(body),
    }

    return (
      this.apiFetcher(`${this.apiCall}${param ? `/${param}` : ''}`, options)
        // @ts-ignore
        .then(this.successHandler)
        .catch(this.errorHandler)
    )
  }

  /**
   *
   * @param {number} params
   * @description Delete method which receives `params` and set a call to api.
   */
  delete(params: number | string): Promise<T | Error> {
    const options: RequestInit = {
      method: 'DELETE',
      credentials: 'include',
    }

    return (
      this.apiFetcher(`${this.apiCall}/${params}`, options)
        // @ts-ignore
        .then(this.successHandler)
        .catch(this.errorHandler)
    )
  }

  successHandler(response: IAPIResponse<T>): T {
    const { data, status, message } = response
    if (status >= 400) {
      throw new Error(`API call failed. ${message}`)
    }

    return data
  }

  errorHandler(error: Error | string): Error {
    throw new Error(
      `Something went wrong. ${error instanceof Error ? error.message : error}`
    )
  }
}

export default ApiFactory
