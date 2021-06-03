import { TFetchProjectAction } from 'actionTypes/project'

export function fetchProjectData(value: string): TFetchProjectAction {
  return {
    type: 'FETCH_PROJECT_DATA',
    value,
  }
}
