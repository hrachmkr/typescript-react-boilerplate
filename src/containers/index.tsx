import { useEffect } from 'react'

type Props = {
  name: string
}

export const App: React.FC<Props> = (props): JSX.Element => {
  useEffect(() => {
    console.log('asd', props.name)
  }, [props])

  return <div>asdasd</div>
}
