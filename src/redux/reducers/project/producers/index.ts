import { TFetchProjectAction } from 'actionTypes/project'
import { IProjectState } from 'reducerTypes/project'

export const fetchProjectDataProducer =
  (action: TFetchProjectAction) =>
  (draft: IProjectState): void => {
    draft.name = action.value
  }
