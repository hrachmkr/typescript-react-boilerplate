import { produce } from 'immer'

import { fetchProjectDataProducer } from './producers'

import { IProjectState } from 'reducerTypes/project'
import { IProjectAction } from 'actionTypes/project'

const initialState: IProjectState = {
  name: '',
  surname: '',
}

const project = (
  state: IProjectState = initialState,
  action: IProjectAction
): IProjectState => {
  return produce(state, (draft: IProjectState) => {
    switch (action.type) {
      case 'FETCH_PROJECT_DATA':
        fetchProjectDataProducer(action)(draft)
        break
    }
  })
}

export default project
